import CanisterMap "mo:candb/CanisterMap";
import Utils "mo:candb/Utils";
import Buffer "mo:stablebuffer/StableBuffer";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Admin "mo:candb/CanDBAdmin";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Entity "mo:candb/Entity";
import CA "mo:candb/CanisterActions";
import schema "schema";

shared ({ caller = owner }) actor class Database() = this {

  type AccountInfo = {
    firstName : Text;
    lastName : Text;
    dob : Text;
    userEmail : Text;
    userType : Text;
    userProfile : Text;
    userGovId : Text;
    hostStatus : Bool;
    verificationStatus : Bool;
  };
  type RentSpaceInfo = {
    spaceTitle : Text;
    spaceDes : Text;
    spaceImage : Text;
    spacePrice : Text;
    spaceLocation : Text;
  };
  type ScanAccount = {
    accounts : [AccountInfo];
    nextKey : ?Text;
  };
  type ScanRentSpaces = {
    rentSpaces : [RentSpaceInfo];
    nextKey : ?Text;
  };
  public type ActorType = actor {
    getPK : query () -> async Text;
    skExists : query (Text) -> async Bool;
    getAccountInfo : query (Text) -> async ?AccountInfo;
    createAccount : (Text, Text, Text, Text, Text, Text) -> async ();
    updateAccountInfo : (Text, AccountInfo) -> async ?AccountInfo;
    createRentSpace : (Text, RentSpaceInfo) -> async ();
    getRentSpace : query (Text) -> async ?RentSpaceInfo;
    updateRentSpace : (Text, RentSpaceInfo) -> async ?RentSpaceInfo;
    scanAccounts : query (Text, Text, Nat, ?Bool) -> async ScanAccount;
    scanRent : query (Text, Text, Nat, ?Bool) -> async ScanRentSpaces;
  };

  // @required stable variable (do not delete or change)

  //holds the canisterMap of PK -> CanisterIdList
  stable var pkToCanisterMap = CanisterMap.init();

  // @required API (do not delete or Change)

  // Get all canister for an specific PK
  public shared query ({ caller = caller }) func getCanistersByPK(pk : Text) : async [Text] {
    getCanistersIdsIfExists(pk);
  };

  // returns all partitions
  public query func getPKs() : async [Text] {
    let allPks = CanisterMap.entries(pkToCanisterMap);

    let iterOfPks = Iter.map<(Text, CanisterMap.CanisterIdList), Text>(
      allPks,
      func(e) {
        e.0;
      },
    );
    return Iter.toArray(iterOfPks);
  };

  // @required function (Do not delete or change)
  ///
  /// Helper method acting as an interface for returning an empty array if no canisters
  /// exist for the given PK
  func getCanistersIdsIfExists(pk : Text) : [Text] {
    switch (CanisterMap.get(pkToCanisterMap, pk)) {
      case null { [] };
      case (?canisterIdsBuffer) { Buffer.toArray(canisterIdsBuffer) };
    };
  };

  public shared ({ caller = caller }) func autoScaleServiceCanister(pk : Text) : async Text {
    // Auto-Scaling Authorization - if the request to auto-scale the partition is not coming from an existing canister in the partition, reject it
    if (Utils.callingCanisterOwnsPK(caller, pkToCanisterMap, pk)) {
      Debug.print("creating an additional canister for pk=" # pk);
      await createCanister(pk, ?[owner, Principal.fromActor(this)]);
    } else {
      throw Error.reject("not authorized");
    };
  };

  public shared ({ caller = creator }) func createNewCanister(canisterName : Text, controllers : ?[Principal]) : async ?Text {
    let pk = canisterName;
    let canisterIds = getCanistersIdsIfExists(pk);
    if (canisterIds == []) {
      ?(await createCanister(pk, ?[owner, Principal.fromActor(this)]));
    } else {
      Debug.print(pk # "already exists");
      null;
    };
  };
  // Spins up a new HelloService canister with the provided pk and controllers
  func createCanister(pk : Text, controllers : ?[Principal]) : async Text {
    Debug.print("creating new hello service canister with pk=" # pk);
    // Pre-load 300 billion cycles for the creation of a new Hello Service canister
    // Note that canister creation costs 100 billion cycles, meaning there are 200 billion
    // left over for the new canister when it is created
    Cycles.add(300_000_000_000);
    let newCanister = await schema.Schema({
      partitonKey = pk;
      scalingOptions = {
        autoScalingHook = autoScaleServiceCanister;
        sizeLimit = #heapSize(475_000_000); // Scale out at 475MB
        // for auto-scaling testing
        //sizeLimit = #count(3); // Scale out at 3 entities inserted
      };
      owners = controllers;
    });
    let newCanisterPrincipal = Principal.fromActor(newCanister);
    await CA.updateCanisterSettings({
      canisterId = newCanisterPrincipal;
      settings = {
        controllers = controllers;
        compute_allocation = ?0;
        memory_allocation = ?0;
        freezing_threshold = ?2592000;
      };
    });

    let newCanisterId = Principal.toText(newCanisterPrincipal);
    // After creating the new Hello Service canister, add it to the pkToCanisterMap
    pkToCanisterMap := CanisterMap.add(pkToCanisterMap, pk, newCanisterId);

    Debug.print("new hello service canisterId=" # newCanisterId);
    newCanisterId;
  };

  public shared ({ caller }) func deleteServiceCanister(serviceId : Text) : async () {
    assert (caller == owner);
    // admin can delete any pk by passing in service id of user principal
    let pk = serviceId;

    let canisterIds = getCanistersIdsIfExists(pk);
    if (canisterIds == []) {
      Debug.print("canister with principal=" # pk # " pk=" # pk # " does not exist");
    } else {
      // can choose to use this statusMap for to detect failures and prompt retries if desired
      let statusMap = await Admin.transferCyclesStopAndDeleteCanisters(canisterIds);
      pkToCanisterMap := CanisterMap.delete(pkToCanisterMap, pk);
    };
  };

  public shared ({ caller }) func upgradeStoryServiceCanistersByPK(serviceId : Text, wasmModule : Blob) : async Text {
    assert (caller == owner);
    let pk = serviceId;
    let scalingOptions = {
      autoScalingHook = autoScaleServiceCanister;
      sizeLimit = #heapSize(475_000_000); // Scale out at 475MB
    };

    let result = await Admin.upgradeCanistersByPK(pkToCanisterMap, pk, wasmModule, scalingOptions);

    return "Canisters in PK " # pk # " upgraded";
  };

  //for validating user
  public shared ({ caller }) func authTest() : async Text {
    assert (caller == owner);
    return "Passed";
  };
  //for the help
  public func getPk(id : Text) : async Text {
    let actorclass = actor (id) : ActorType;
    await actorclass.getPK();
  };

  public func skExist(id : Text, sk : Text) : async Bool {
    let actorclass = actor (id) : ActorType;
    await actorclass.skExists(sk);
  };

  public func getInfo(id : Text, sk : Text) : async ?AccountInfo {
    let actorclass = actor (id) : ActorType;
    await actorclass.getAccountInfo(sk);
  };

  public func putAccount(id : Text, sk : Text, firstName : Text, lastName : Text, dob : Text, email : Text, userType : Text) : async () {
    let actorclass = actor (id) : ActorType;
    await actorclass.createAccount(sk, firstName, lastName, dob, email, userType);
  };

  public func updateAccount(canisterId : Text, user : Text, accountData : AccountInfo) : async ?AccountInfo {
    let actorclass = actor (canisterId) : ActorType;
    await actorclass.updateAccountInfo(user, accountData);
  };
  public func scanAccounts(canisterId : Text, skUpper : Text, skLower : Text, limit : Nat, ascending : ?Bool) : async ScanAccount {
    let actorclass = actor (canisterId) : ActorType;
    await actorclass.scanAccounts(skUpper, skLower, limit, ascending);
  };
  public func createRentSpace(canisterId : Text, uuid : Text, spaceData : RentSpaceInfo) : async () {
    let actorclass = actor (canisterId) : ActorType;
    await actorclass.createRentSpace(uuid, spaceData);
  };

  public func getRentSpace(canisterId : Text, uuid : Text) : async ?RentSpaceInfo {
    let actorclass = actor (canisterId) : ActorType;
    await actorclass.getRentSpace(uuid);
  };

  public func updateRentSpace(canisterId : Text, uuid : Text, spaceData : RentSpaceInfo) : async ?RentSpaceInfo {
    let actorclass = actor (canisterId) : ActorType;
    await actorclass.updateRentSpace(uuid : Text, spaceData : RentSpaceInfo);
  };
  public func scanRent(canisterId : Text, skUpper : Text, skLower : Text, limit : Nat, ascending : ?Bool) : async ScanRentSpaces {
    let actorclass = actor (canisterId) : ActorType;
    await actorclass.scanRent(skUpper, skLower, limit, ascending);
  };

};

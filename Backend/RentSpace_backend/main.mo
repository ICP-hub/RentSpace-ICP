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
import List "mo:base/List";
import User "UserCanister";
import Hotel "HotelCanister";

shared ({caller = owner}) actor class Database() = this {

  type UserInfo = {
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
  type HotelInfo = {
    hotelTitle : Text;
    hotelDes : Text;
    hotelImage : Text;
    hotelPrice : Text;
    hotelLocation : Text;
  };
  type ScanUser = {
    users : [UserInfo];
    nextKey : ?Text;
  };
  type ScanHotels = {
    hotels : [HotelInfo];
    nextKey : ?Text;
  };
  public type UserType = actor {
    getPK : query () -> async Text;
    skExists : query (Text) -> async Bool;
    getUserInfo : query (Text) -> async ?UserInfo;
    createUser : (Text, Text, Text, Text, Text, Text) -> async ();
    updateUserInfo : (Text, UserInfo) -> async ?UserInfo;
    scanUsers : query (Text, Text, Nat, ?Bool) -> async ScanUser;
  };
  public type HotelType = actor {
    createHotel : (Text,Text, HotelInfo) -> async ();
    getHotel : query (Text) -> async ?HotelInfo;
    updateHotel : (Text, HotelInfo) -> async ?HotelInfo;
    scanRent : query (Text, Text, Nat, ?Bool) -> async ScanHotels;
    getHotelId : query (Text) -> async ?[Text];
  };

  // @required stable variable (do not delete or change)

  //holds the canisterMap of PK -> CanisterIdList
  stable var pkToCanisterMap = CanisterMap.init();

  // @required API (do not delete or Change)

  // Get all canister for an specific PK
  public shared query ({caller = caller}) func getCanistersByPK(pk : Text) : async [Text] {
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
      case null {[]};
      case (?canisterIdsBuffer) {Buffer.toArray(canisterIdsBuffer)};
    };
  };

  public shared ({caller = caller}) func autoScaleUserCanister(pk : Text) : async Text {
    // Auto-Scaling Authorization - if the request to auto-scale the partition is not coming from an existing canister in the partition, reject it
    if (Utils.callingCanisterOwnsPK(caller, pkToCanisterMap, pk)) {
      Debug.print("creating an additional canister for pk=" # pk);
      await createActorCanister(pk, ?[owner, Principal.fromActor(this)]);
    } else {
      throw Error.reject("not authorized");
    };
  };

  public shared ({caller = creator}) func createNewUserCanister(canisterName : Text, controllers : ?[Principal]) : async ?Text {
    let pk = canisterName;
    let canisterIds = getCanistersIdsIfExists(pk);
    if (canisterIds == []) {
      ?(await createUserCanister(pk, ?[owner, Principal.fromActor(this)]));
    } else {
      Debug.print(pk # "already exists");
      null;
    };
  };

  // Spins up a new HelloService canister with the provided pk and controllers
  func createUserCanister(pk : Text, controllers : ?[Principal]) : async Text {
    Debug.print("creating new hello service canister with pk=" # pk);
    // Pre-load 300 billion cycles for the creation of a new Hello Service canister
    // Note that canister creation costs 100 billion cycles, meaning there are 200 billion
    // left over for the new canister when it is created
    Cycles.add(300_000_000_000);
    let newCanister = await User.Users({
      partitonKey = pk;
      scalingOptions = {
        autoScalingHook = autoScaleUserCanister;
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

    Debug.print("new User canisterId=" # newCanisterId);
    newCanisterId;
  };

  public shared ({caller}) func deleteCanister(serviceId : Text) : async () {
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

  public shared ({caller}) func upgradeCanisterByPK(serviceId : Text, wasmModule : Blob) : async Text {
    assert (caller == owner);
    let pk = serviceId;
    let scalingOptions = {
      autoScalingHook = autoScaleUserCanister;
      sizeLimit = #heapSize(475_000_000); // Scale out at 475MB
    };

    let result = await Admin.upgradeCanistersByPK(pkToCanisterMap, pk, wasmModule, scalingOptions);

    return "Canisters in PK " # pk # " upgraded";
  };

  //for validating user
  public shared ({caller}) func authTest() : async Text {
    assert (caller == owner);
    return "Passed";
  };
  //for the help
  public func getPk(id : Text) : async Text {
    let actorclass = actor (id) : UserType;
    await actorclass.getPK();
  };

  public func skExist(id : Text, sk : Text) : async Bool {
    let actorclass = actor (id) : UserType;
    await actorclass.skExists(sk);
  };

  public func getInfo(id : Text, sk : Text) : async ?UserInfo {
    let actorclass = actor (id) : UserType;
    await actorclass.getUserInfo(sk);
  };

  public func putUser(id : Text, sk : Text, firstName : Text, lastName : Text, dob : Text, email : Text, userType : Text) : async () {
    let actorclass = actor (id) : UserType;
    await actorclass.createUser(sk, firstName, lastName, dob, email, userType);
  };

  public func updateUser(canisterId : Text, user : Text, userData : UserInfo) : async ?UserInfo {
    let actorclass = actor (canisterId) : UserType;
    await actorclass.updateUserInfo(user, userData);
  };
  public func scanUsers(canisterId : Text, skUpper : Text, skLower : Text, limit : Nat, ascending : ?Bool) : async ScanUser {
    let actorclass = actor (canisterId) : UserType;
    await actorclass.scanUsers(skUpper, skLower, limit, ascending);
  };
  public func createHotel(canisterId : Text, userIdentity:Text,uuid : Text, hotelData : HotelInfo) : async () {
    let actorclass = actor (canisterId) : HotelType;
    await actorclass.createHotel(userIdentity,uuid, hotelData);
  };

  public func getHotel(canisterId : Text, uuid : Text) : async ?HotelInfo {
    let actorclass = actor (canisterId) : HotelType;
    await actorclass.getHotel(uuid);
  };

  public func updateHotel(canisterId : Text, uuid : Text, hotelData : HotelInfo) : async ?HotelInfo {
    let actorclass = actor (canisterId) : HotelType;
    await actorclass.updateHotel(uuid : Text, hotelData : HotelInfo);
  };
  public func scanRent(canisterId : Text, skUpper : Text, skLower : Text, limit : Nat, ascending : ?Bool) : async ScanHotels {
    let actorclass = actor (canisterId) : HotelType;
    await actorclass.scanRent(skUpper, skLower, limit, ascending);
  };

  public func getHotelId(canisterId : Text, userIdentity : Text) : async ?[Text] {
    let actorclass = actor (canisterId) : HotelType;
    await actorclass.getHotelId(userIdentity);
  };

  public shared ({caller = caller}) func autoScaleHotelCanister(pk : Text) : async Text {
    // Auto-Scaling Authorization - if the request to auto-scale the partition is not coming from an existing canister in the partition, reject it
    if (Utils.callingCanisterOwnsPK(caller, pkToCanisterMap, pk)) {
      Debug.print("creating an additional canister for pk=" # pk);
      await createActorCanister(pk, ?[owner, Principal.fromActor(this)]);
    } else {
      throw Error.reject("not authorized");
    };
  };

  public shared ({caller = creator}) func createNewHotelCanister(canisterName : Text, controllers : ?[Principal]) : async ?Text {
    let pk = canisterName;
    let canisterIds = getCanistersIdsIfExists(pk);
    if (canisterIds == []) {
      ?(await createActorCanister(pk, ?[owner, Principal.fromActor(this)]));
    } else {
      Debug.print(pk # "already exists");
      null;
    };
  };

  // Spins up a new HelloService canister with the provided pk and controllers
  func createActorCanister(pk : Text, controllers : ?[Principal]) : async Text {
    Debug.print("creating new hello service canister with pk=" # pk);
    // Pre-load 300 billion cycles for the creation of a new Hello Service canister
    // Note that canister creation costs 100 billion cycles, meaning there are 200 billion
    // left over for the new canister when it is created
    Cycles.add(300_000_000_000);
    let newCanister = await Hotel.Hotel({
      partitonKey = pk;
      scalingOptions = {
        autoScalingHook = autoScaleHotelCanister;
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

    Debug.print("new User canisterId=" # newCanisterId);
    newCanisterId;
  };

};

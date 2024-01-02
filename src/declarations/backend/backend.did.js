export const idlFactory = ({ IDL }) => {
  const Canister = IDL.Variant({
    'review' : IDL.Null,
    'hotel' : IDL.Null,
    'user' : IDL.Null,
    'booking' : IDL.Null,
  });
  const Database = IDL.Service({
    'autoScaleBookingCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'autoScaleHotelCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'autoScaleReviewCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'autoScaleUserCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'createNewCanister' : IDL.Func(
        [IDL.Text, Canister],
        [IDL.Opt(IDL.Text)],
        [],
      ),
    'deleteCanister' : IDL.Func([IDL.Text], [], []),
    'getCanistersByPK' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'getOwner' : IDL.Func([], [IDL.Text], ['query']),
    'getPKs' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'upgradeCanisterByPK' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat8)],
        [IDL.Text],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
  return Database;
};
export const init = ({ IDL }) => { return []; };

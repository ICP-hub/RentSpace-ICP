export const idlFactory = ({ IDL }) => {
  const Database = IDL.Service({
    'autoScaleBookingCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'autoScaleHotelCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'autoScaleUserCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'createNewBookingCanister' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], []),
    'createNewHotelCanister' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], []),
    'createNewUserCanister' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], []),
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

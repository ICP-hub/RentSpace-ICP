export const idlFactory = ({ IDL }) => {
  const Canister = IDL.Variant({
    'hotel' : IDL.Null,
    'user' : IDL.Null,
    'booking' : IDL.Null,
  });
  const ReviewParent = IDL.Service({
    'autoScaleCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'createNewCanister' : IDL.Func(
        [IDL.Text, Canister],
        [IDL.Opt(IDL.Text)],
        [],
      ),
    'getCanistersByPK' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'getPKs' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
  });
  return ReviewParent;
};
export const init = ({ IDL }) => { return []; };

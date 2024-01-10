export const idlFactory = ({ IDL }) => {
  const ReviewParent = IDL.Service({
    'createNewCanister' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], []),
    'getCanistersByPK' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'getPKs' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
  });
  return ReviewParent;
};
export const init = ({ IDL }) => { return []; };

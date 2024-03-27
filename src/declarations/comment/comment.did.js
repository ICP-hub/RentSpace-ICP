export const idlFactory = ({ IDL }) => {
  const AdminId = IDL.Text;
  const ErrorCode = IDL.Variant({
    'canister_error' : IDL.Null,
    'call_error' : IDL.Record({ 'err_code' : IDL.Nat32 }),
    'system_transient' : IDL.Null,
    'future' : IDL.Nat32,
    'canister_reject' : IDL.Null,
    'destination_invalid' : IDL.Null,
    'system_fatal' : IDL.Null,
  });
  const Result = IDL.Variant({
    'ok' : IDL.Text,
    'err' : IDL.Tuple(ErrorCode, IDL.Text),
  });
  const CommentId = IDL.Text;
  const Comment = IDL.Record({
    'parentCommentId' : IDL.Text,
    'userId' : IDL.Text,
    'createdAt' : IDL.Text,
    'hotelId' : IDL.Text,
    'comment' : IDL.Text,
  });
  const anon_class_13_1 = IDL.Service({
    'addOwner' : IDL.Func([AdminId], [IDL.Text], []),
    'createComment' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result], []),
    'getAllAdmin' : IDL.Func([], [IDL.Vec(AdminId)], ['query']),
    'getComments' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(CommentId, Comment))],
        ['query'],
      ),
    'getSingleComments' : IDL.Func([IDL.Text, IDL.Text], [Comment], ['query']),
    'scanComment' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Tuple(CommentId, Comment))))],
        ['query'],
      ),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
  return anon_class_13_1;
};
export const init = ({ IDL }) => { return []; };

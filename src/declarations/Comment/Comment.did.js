export const idlFactory = ({ IDL }) => {
  const CommentInput = IDL.Record({
    'parentCommentId' : IDL.Text,
    'message' : IDL.Text,
  });
  const Comment__1 = IDL.Record({
    'commentId' : IDL.Text,
    'parentCommentId' : IDL.Text,
    'userId' : IDL.Text,
    'createdAt' : IDL.Text,
    'hotelId' : IDL.Text,
    'comment' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : Comment__1, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Vec(Comment__1), 'err' : IDL.Text });
  const Comment = IDL.Service({
    'createComment' : IDL.Func([IDL.Text, CommentInput], [Result_1], []),
    'getComments' : IDL.Func([IDL.Text], [Result], ['query']),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
  return Comment;
};
export const init = ({ IDL }) => { return []; };

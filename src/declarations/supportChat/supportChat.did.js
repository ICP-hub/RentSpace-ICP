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
  const UserIdentity = IDL.Text;
  const Issue = IDL.Record({
    'message' : IDL.Text,
    'reply' : IDL.Opt(IDL.Text),
  });
  const TicketId = IDL.Text;
  const Address = IDL.Record({
    'region' : IDL.Text,
    'country' : IDL.Text,
    'city' : IDL.Text,
    'postalCode' : IDL.Text,
    'building' : IDL.Text,
    'streetAddress' : IDL.Text,
  });
  const Ticket = IDL.Record({
    'resolved' : IDL.Bool,
    'createdAt' : IDL.Text,
    'address' : Address,
    'customerId' : IDL.Text,
    'messageToAdmin' : IDL.Text,
    'messageToHost' : IDL.Text,
    'reason' : IDL.Text,
  });
  const anon_class_12_1 = IDL.Service({
    'addOwner' : IDL.Func([AdminId], [IDL.Text], []),
    'createIssue' : IDL.Func([IDL.Text], [Result], []),
    'getAllAdmin' : IDL.Func([], [IDL.Vec(AdminId)], ['query']),
    'getAllUnResolvedIssue' : IDL.Func([], [IDL.Vec(UserIdentity)], ['query']),
    'getAllUserIssue' : IDL.Func([], [IDL.Vec(Issue)], ['query']),
    'getNoOfPages' : IDL.Func([IDL.Nat], [IDL.Nat], ['query']),
    'getResolvedIssue' : IDL.Func([], [IDL.Vec(Issue)], ['query']),
    'getTicket' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TicketId, Ticket))],
        ['query'],
      ),
    'getUserTicketsByAdmin' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(TicketId, Ticket))],
        ['query'],
      ),
    'isAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'raiseNewTicket' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, Address],
        [Result],
        [],
      ),
    'removeResolvedTicketRaised' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'resolveTicketRaised' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'resolveUserIssue' : IDL.Func([UserIdentity, IDL.Text], [], []),
    'scanBooking' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Tuple(TicketId, Ticket))))],
        ['query'],
      ),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
  return anon_class_12_1;
};
export const init = ({ IDL }) => { return []; };

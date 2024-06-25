export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const Address = IDL.Record({
    'region' : IDL.Text,
    'country' : IDL.Text,
    'city' : IDL.Text,
    'postalCode' : IDL.Text,
    'building' : IDL.Text,
    'streetAddress' : IDL.Text,
  });
  const TicketInput = IDL.Record({
    'address' : Address,
    'messageToAdmin' : IDL.Text,
    'messageToHost' : IDL.Text,
    'reason' : IDL.Text,
  });
  const Result_5 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Principal),
    'err' : IDL.Text,
  });
  const SupportMessage = IDL.Record({
    'to' : IDL.Principal,
    'from' : IDL.Principal,
    'createdAt' : IDL.Text,
    'message' : IDL.Text,
    'byAdmin' : IDL.Bool,
  });
  const Result_4 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(SupportMessage))),
    'err' : IDL.Text,
  });
  const Ticket = IDL.Record({
    'resolved' : IDL.Bool,
    'createdAt' : IDL.Text,
    'ticketId' : IDL.Text,
    'address' : Address,
    'customerId' : IDL.Text,
    'messageToAdmin' : IDL.Text,
    'messageToHost' : IDL.Text,
    'reason' : IDL.Text,
  });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(IDL.Text, Ticket)),
    'err' : IDL.Text,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(SupportMessage),
    'err' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Support = IDL.Service({
    'addAdmin' : IDL.Func([IDL.Principal], [Result], []),
    'checkIsAdmin' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'createTicket' : IDL.Func([TicketInput, Address], [Result], []),
    'getAllAdmins' : IDL.Func([], [Result_5], []),
    'getAllChats' : IDL.Func([IDL.Nat, IDL.Nat], [Result_4], []),
    'getAllUnresolvedTickets' : IDL.Func([IDL.Nat, IDL.Nat], [Result_3], []),
    'getAllUserMessages' : IDL.Func([IDL.Principal], [Result_2], []),
    'getNoOfUnresolvedTickets' : IDL.Func([], [Result_1], []),
    'getNumberOfChats' : IDL.Func([], [Result_1], []),
    'resolveTicket' : IDL.Func([IDL.Text], [Result], []),
    'sendMessage' : IDL.Func([IDL.Text, IDL.Opt(IDL.Principal)], [Result], []),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
  return Support;
};
export const init = ({ IDL }) => { return []; };

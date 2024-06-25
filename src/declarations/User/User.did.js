export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const AnnualData = IDL.Record({
    'aug' : IDL.Nat,
    'dec' : IDL.Nat,
    'feb' : IDL.Nat,
    'jan' : IDL.Nat,
    'may' : IDL.Nat,
    'nov' : IDL.Nat,
    'oct' : IDL.Nat,
    'sep' : IDL.Nat,
    'march' : IDL.Nat,
    'april' : IDL.Nat,
    'july' : IDL.Nat,
    'june' : IDL.Nat,
  });
  const Result_2 = IDL.Variant({ 'ok' : AnnualData, 'err' : IDL.Text });
  const UserInfo = IDL.Record({
    'dob' : IDL.Text,
    'userRole' : IDL.Text,
    'userEmail' : IDL.Text,
    'userGovID' : IDL.Text,
    'userID' : IDL.Principal,
    'createdAt' : IDL.Text,
    'agreementStatus' : IDL.Bool,
    'govIDLink' : IDL.Text,
    'isHost' : IDL.Bool,
    'userImage' : IDL.Text,
    'isVerified' : IDL.Bool,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : UserInfo, 'err' : IDL.Text });
  const User__1 = IDL.Record({
    'dob' : IDL.Text,
    'userEmail' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const User = IDL.Service({
    'checkUserExist' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'deleteUser' : IDL.Func([], [Result], []),
    'getAnnualRegisterByYear' : IDL.Func([IDL.Text], [Result_2], []),
    'getUserByPrincipal' : IDL.Func([IDL.Principal], [Result_1], []),
    'getuserDetails' : IDL.Func([], [Result_1], []),
    'registerUser' : IDL.Func([User__1], [Result], []),
    'updateUserDetails' : IDL.Func([UserInfo], [Result], []),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
  return User;
};
export const init = ({ IDL }) => { return []; };

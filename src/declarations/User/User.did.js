export const idlFactory = ({ IDL }) => {
  const AdminId = IDL.Text;
  const User__1 = IDL.Record({
    'dob' : IDL.Text,
    'userEmail' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
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
  const UserInfo = IDL.Record({
    'dob' : IDL.Text,
    'userType' : IDL.Text,
    'userEmail' : IDL.Text,
    'userGovId' : IDL.Text,
    'createdAt' : IDL.Text,
    'hostStatus' : IDL.Bool,
    'agreementStatus' : IDL.Bool,
    'userProfile' : IDL.Text,
    'lastName' : IDL.Text,
    'verificationStatus' : IDL.Bool,
    'firstName' : IDL.Text,
  });
  const UserId = IDL.Text;
  const User = IDL.Service({
    'addOwner' : IDL.Func([AdminId], [IDL.Text], []),
    'checkUserExist' : IDL.Func([], [IDL.Bool], ['query']),
    'addOwner' : IDL.Func([AdminId], [IDL.Text], []),
    'checkUserExist' : IDL.Func([], [IDL.Bool], ['query']),
    'createUser' : IDL.Func([User__1], [], []),
    'getAnnualRegisterByYear' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(AnnualData)],
        ['query'],
      ),
    'getNoOfPages' : IDL.Func([IDL.Nat], [IDL.Nat], ['query']),
    'getOwner' : IDL.Func([], [IDL.Text], ['query']),
    'getUserInfo' : IDL.Func([], [IDL.Opt(UserInfo)], ['query']),
    'getUserInfoByPrincipal' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserInfo)],
        ['query'],
      ),
    'scanUsers' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(UserId, UserInfo))],
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(UserId, UserInfo))],
        ['query'],
      ),
    'updateUserInfo' : IDL.Func([UserInfo], [IDL.Opt(UserInfo)], []),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
  return User;
};
export const init = ({ IDL }) => { return []; };

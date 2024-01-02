export const idlFactory = ({ IDL }) => {
  const AutoScalingCanisterSharedFunctionHook = IDL.Func(
      [IDL.Text],
      [IDL.Text],
      [],
    );
  const ScalingLimitType = IDL.Variant({
    'heapSize' : IDL.Nat,
    'count' : IDL.Nat,
  });
  const ScalingOptions = IDL.Record({
    'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
    'sizeLimit' : ScalingLimitType,
  });
  const User__1 = IDL.Record({
    'dob' : IDL.Text,
    'userEmail' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const UserInfo = IDL.Record({
    'dob' : IDL.Text,
    'userType' : IDL.Text,
    'userEmail' : IDL.Text,
    'userGovId' : IDL.Text,
    'createdAt' : IDL.Text,
    'hostStatus' : IDL.Bool,
    'userProfile' : IDL.Text,
    'lastName' : IDL.Text,
    'verificationStatus' : IDL.Bool,
    'firstName' : IDL.Text,
  });
  const ScanUser = IDL.Record({
    'nextKey' : IDL.Opt(IDL.Text),
    'users' : IDL.Vec(UserInfo),
  });
  const User = IDL.Service({
    'createUser' : IDL.Func([User__1], [], []),
    'getOwner' : IDL.Func([], [IDL.Text], ['query']),
    'getPK' : IDL.Func([], [IDL.Text], ['query']),
    'getUserInfo' : IDL.Func([], [IDL.Opt(UserInfo)], ['query']),
    'scanUsers' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Bool)],
        [ScanUser],
        ['query'],
      ),
    'skExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'transferCycles' : IDL.Func([], [], []),
    'updateUserInfo' : IDL.Func([UserInfo], [IDL.Opt(UserInfo)], []),
  });
  return User;
};
export const init = ({ IDL }) => {
  const AutoScalingCanisterSharedFunctionHook = IDL.Func(
      [IDL.Text],
      [IDL.Text],
      [],
    );
  const ScalingLimitType = IDL.Variant({
    'heapSize' : IDL.Nat,
    'count' : IDL.Nat,
  });
  const ScalingOptions = IDL.Record({
    'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
    'sizeLimit' : ScalingLimitType,
  });
  return [
    IDL.Record({
      'owners' : IDL.Opt(IDL.Vec(IDL.Principal)),
      'partitonKey' : IDL.Text,
      'scalingOptions' : ScalingOptions,
    }),
  ];
};

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
  const UserInfo = IDL.Record({
    'dob' : IDL.Text,
    'userType' : IDL.Text,
    'userEmail' : IDL.Text,
    'userGovId' : IDL.Text,
    'userId' : IDL.Text,
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
  const Users = IDL.Service({
    'createUser' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'getPK' : IDL.Func([], [IDL.Text], ['query']),
    'getUserInfo' : IDL.Func([IDL.Text], [IDL.Opt(UserInfo)], ['query']),
    'scanUsers' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Bool)],
        [ScanUser],
        ['query'],
      ),
    'skExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'transferCycles' : IDL.Func([], [], []),
    'updateUserInfo' : IDL.Func([IDL.Text, UserInfo], [IDL.Opt(UserInfo)], []),
  });
  return Users;
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

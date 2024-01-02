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
  const Review__1 = IDL.Record({
    'des' : IDL.Text,
    'title' : IDL.Text,
    'bookingId' : IDL.Text,
    'createdAt' : IDL.Text,
    'rating' : IDL.Float64,
  });
  const ScanReview = IDL.Record({
    'review' : IDL.Vec(Review__1),
    'nextKey' : IDL.Opt(IDL.Text),
  });
  const Review = IDL.Service({
    'createReview' : IDL.Func([IDL.Text, Review__1], [], []),
    'getOwner' : IDL.Func([], [IDL.Text], ['query']),
    'getPk' : IDL.Func([], [IDL.Text], ['query']),
    'getReviewInfo' : IDL.Func([], [IDL.Opt(Review__1)], ['query']),
    'scanUsers' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Bool)],
        [ScanReview],
        ['query'],
      ),
    'skExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'transferCycles' : IDL.Func([], [], []),
    'updateReviewInfo' : IDL.Func(
        [IDL.Text, Review__1],
        [IDL.Opt(Review__1)],
        [],
      ),
  });
  return Review;
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

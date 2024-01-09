export const idlFactory = ({ IDL }) => {
  const ScalingLimitType = IDL.Variant({
    'heapSize' : IDL.Null,
    'count' : IDL.Null,
  });
  const ScalingOptions = IDL.Record({
    'limitType' : ScalingLimitType,
    'limit' : IDL.Nat,
    'autoScalingCanisterId' : IDL.Text,
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
    'getHotelId' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getOwner' : IDL.Func([], [IDL.Text], ['query']),
    'getPk' : IDL.Func([], [IDL.Text], ['query']),
    'getReviewIdsFromHotelId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Text)],
        ['query'],
      ),
    'getReviewInfo' : IDL.Func([IDL.Text], [IDL.Opt(Review__1)], ['query']),
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
  const ScalingLimitType = IDL.Variant({
    'heapSize' : IDL.Null,
    'count' : IDL.Null,
  });
  const ScalingOptions = IDL.Record({
    'limitType' : ScalingLimitType,
    'limit' : IDL.Nat,
    'autoScalingCanisterId' : IDL.Text,
  });
  return [
    IDL.Record({
      'owners' : IDL.Opt(IDL.Vec(IDL.Principal)),
      'partitionKey' : IDL.Text,
      'scalingOptions' : ScalingOptions,
    }),
  ];
};

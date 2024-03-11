export const idlFactory = ({ IDL }) => {
  const AdminId = IDL.Text;
  const Review__1 = IDL.Record({
    'des' : IDL.Text,
    'title' : IDL.Text,
    'bookingId' : IDL.Text,
    'createdAt' : IDL.Text,
    'rating' : IDL.Float64,
  });
  const ReviewId = IDL.Text;
  const HotelId = IDL.Text;
  const Review = IDL.Service({
    'addOwner' : IDL.Func([AdminId], [IDL.Text], []),
    'createReview' : IDL.Func([IDL.Text, Review__1], [], ['oneway']),
    'getHotelId' : IDL.Func([], [IDL.Vec(ReviewId)], ['query']),
    'getNoOfPages' : IDL.Func([IDL.Nat], [IDL.Nat], ['query']),
    'getReviewIdsFromHotelId' : IDL.Func(
        [HotelId],
        [IDL.Vec(ReviewId)],
        ['query'],
      ),
    'getReviewInfo' : IDL.Func([IDL.Text], [IDL.Opt(Review__1)], ['query']),
    'scanReview' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(ReviewId, Review__1))],
        ['query'],
      ),
    'updateReviewInfo' : IDL.Func(
        [IDL.Text, Review__1],
        [IDL.Opt(Review__1)],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
  return Review;
};
export const init = ({ IDL }) => { return []; };

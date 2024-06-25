export const idlFactory = ({ IDL }) => {
  const ReviewInput = IDL.Record({
    'des' : IDL.Text,
    'title' : IDL.Text,
    'hotelId' : IDL.Text,
    'rating' : IDL.Float64,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const Review__1 = IDL.Record({
    'des' : IDL.Text,
    'title' : IDL.Text,
    'userId' : IDL.Text,
    'createdAt' : IDL.Text,
    'hotelId' : IDL.Text,
    'rating' : IDL.Float64,
    'reviewId' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Vec(Review__1), 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Review = IDL.Service({
    'createReview' : IDL.Func([IDL.Text, ReviewInput], [Result_2], []),
    'getAllReviewsOnHotel' : IDL.Func([IDL.Text], [Result_1], []),
    'getHotelRating' : IDL.Func([IDL.Text], [Result], []),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
  return Review;
};
export const init = ({ IDL }) => { return []; };

export const idlFactory = ({ IDL }) => {
  const PaymentType = IDL.Variant({
    'icp' : IDL.Record({ 'id' : IDL.Nat }),
    'sol' : IDL.Null,
    'creditCard' : IDL.Null,
    'ckBTC' : IDL.Record({ 'id' : IDL.Nat }),
    'ckETH' : IDL.Record({ 'id' : IDL.Nat }),
    'paypal' : IDL.Null,
  });
  const BookingInput = IDL.Record({
    'hotelId' : IDL.Text,
    'checkInDate' : IDL.Text,
    'bookingDuration' : IDL.Nat,
    'checkOutDate' : IDL.Text,
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const BookingInfo = IDL.Record({
    'paymentStatus' : IDL.Bool,
    'bookingId' : IDL.Text,
    'refundStatus' : IDL.Bool,
    'userId' : IDL.Text,
    'hotelId' : IDL.Text,
    'checkInDate' : IDL.Text,
    'bookingDuration' : IDL.Nat,
    'bookingDate' : IDL.Text,
    'paymentId' : IDL.Text,
    'checkOutDate' : IDL.Text,
    'cancelStatus' : IDL.Bool,
    'euroAmount' : IDL.Nat,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(BookingInfo),
    'err' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : BookingInfo, 'err' : IDL.Text });
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
  const Result = IDL.Variant({ 'ok' : AnnualData, 'err' : IDL.Text });
  const Booking = IDL.Service({
    'createBooking' : IDL.Func(
        [PaymentType, BookingInput, IDL.Nat, IDL.Nat],
        [Result_3],
        [],
      ),
    'getAllHotelBookings' : IDL.Func([IDL.Text], [Result_2], []),
    'getAllUserBookings' : IDL.Func([], [Result_2], []),
    'getBookingDetails' : IDL.Func([IDL.Text], [Result_1], []),
    'getBookingFrequency' : IDL.Func([IDL.Text], [Result], []),
  });
  return Booking;
};
export const init = ({ IDL }) => { return []; };

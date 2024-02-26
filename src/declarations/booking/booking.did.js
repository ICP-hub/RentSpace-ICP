export const idlFactory = ({ IDL }) => {
  const HotelId = IDL.Text;
  const BookingInfo = IDL.Record({
    'paymentStatus' : IDL.Bool,
    'refundStatus' : IDL.Bool,
    'userId' : IDL.Text,
    'date' : IDL.Text,
    'bookingDuration' : IDL.Text,
    'paymentId' : IDL.Text,
    'cancelStatus' : IDL.Bool,
  });
  const BookingId = IDL.Text;
  const anon_class_13_1 = IDL.Service({
    'bookHotel' : IDL.Func([HotelId, BookingInfo], [], []),
    'getBookingDetials' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(BookingInfo)],
        ['query'],
      ),
    'getBookingId' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'gethotelXBookingId' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'scanBooking' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(BookingId, BookingInfo))],
        [],
      ),
    'updateBookingStatus' : IDL.Func([IDL.Text, BookingInfo], [], []),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
  return anon_class_13_1;
};
export const init = ({ IDL }) => { return []; };

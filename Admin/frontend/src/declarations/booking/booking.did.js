export const idlFactory = ({ IDL }) => {
  const AdminId = IDL.Text;
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
  const BookingId = IDL.Text;
  const anon_class_14_1 = IDL.Service({
    'addOwner' : IDL.Func([AdminId], [IDL.Text], []),
    'bookHotel' : IDL.Func([HotelId, BookingInfo], [], []),
    'getBookingDetials' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(BookingInfo)],
        ['query'],
      ),
    'getBookingFrequencyInYear' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(AnnualData)],
        ['query'],
      ),
    'getBookingId' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'gethotelXBookingId' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'scanBooking' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(BookingId, BookingInfo))],
        ['query'],
      ),
    'updateBookingStatus' : IDL.Func([IDL.Text, BookingInfo], [], []),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
  return anon_class_14_1;
};
export const init = ({ IDL }) => { return []; };

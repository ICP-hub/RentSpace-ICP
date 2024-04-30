export const idlFactory = ({ IDL }) => {
  const AdminId = IDL.Text;
  const HotelId = IDL.Text;
  const BookingDuration = IDL.Record({
    'bookedAt' : IDL.Text,
    'bookedTill' : IDL.Text,
  });
  const BookingInfo = IDL.Record({
    'paymentStatus' : IDL.Bool,
    'refundStatus' : IDL.Bool,
    'userId' : IDL.Text,
    'date' : IDL.Text,
    'hotelId' : IDL.Text,
    'checkInDate' : IDL.Text,
    'bookingDuration' : BookingDuration,
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
  const HttpHeader = IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text });
  const HttpResponsePayload = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader),
  });
  const TransformArgs = IDL.Record({
    'context' : IDL.Vec(IDL.Nat8),
    'response' : HttpResponsePayload,
  });
  const CanisterHttpResponsePayload = IDL.Record({
    'status' : IDL.Nat,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HttpHeader),
  });
  const _anon_class_17_1 = IDL.Service({
    'addOwner' : IDL.Func([AdminId], [IDL.Text], []),
    'bookHotel' : IDL.Func(
        [
          HotelId,
          BookingInfo,
          IDL.Variant({
            'icp' : IDL.Null,
            'solana' : IDL.Text,
            'ckbtc' : IDL.Null,
          }),
          IDL.Nat,
        ],
        [IDL.Text],
        [],
      ),
    'getAllAdmin' : IDL.Func([], [IDL.Vec(AdminId)], ['query']),
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
    'getNoOfPages' : IDL.Func([IDL.Nat], [IDL.Nat], ['query']),
    'get_icp_usd_exchange' : IDL.Func([], [IDL.Text], []),
    'gethotelXBookingId' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'hotelBookingDuration' : IDL.Func(
        [HotelId],
        [IDL.Vec(IDL.Tuple(BookingId, BookingDuration))],
        [],
      ),
    'scanBooking' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(BookingId, BookingInfo))],
        ['query'],
      ),
    'transform' : IDL.Func(
        [TransformArgs],
        [CanisterHttpResponsePayload],
        ['query'],
      ),
    'updateBookingStatus' : IDL.Func([IDL.Text, BookingInfo], [], []),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
  return _anon_class_17_1;
};
export const init = ({ IDL }) => { return []; };

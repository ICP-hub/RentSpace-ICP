export const idlFactory = ({ IDL }) => {
  const AdminId = IDL.Text;
  const HotelId = IDL.Text;
  const BookingInfo = IDL.Record({
    'paymentStatus' : IDL.Bool,
    'refundStatus' : IDL.Bool,
    'userId' : IDL.Text,
    'date' : IDL.Text,
    'hotelId' : IDL.Text,
    'checkInDate' : IDL.Text,
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
  const TransferFromError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'TemporarilyUnavailable' : IDL.Null,
    'InsufficientAllowance' : IDL.Record({ 'allowance' : IDL.Nat }),
    'BadBurn' : IDL.Record({ 'min_burn_amount' : IDL.Nat }),
    'Duplicate' : IDL.Record({ 'duplicate_of' : IDL.Nat }),
    'BadFee' : IDL.Record({ 'expected_fee' : IDL.Nat }),
    'CreatedInFuture' : IDL.Record({ 'ledger_time' : IDL.Nat64 }),
    'TooOld' : IDL.Null,
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
  });
  const Result_2 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : TransferFromError });
  const BookingId = IDL.Text;
  const anon_class_13_1 = IDL.Service({
    'addOwner' : IDL.Func([AdminId], [IDL.Text], []),
    'bookHotel' : IDL.Func(
        [
          HotelId,
          BookingInfo,
          IDL.Variant({ 'icp' : IDL.Null, 'ckbtc' : IDL.Null }),
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
    'gethotelXBookingId' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'icrc2_transferFrom' : IDL.Func(
        [
          IDL.Variant({ 'icp' : IDL.Null, 'ckbtc' : IDL.Null }),
          IDL.Principal,
          IDL.Principal,
          IDL.Nat,
        ],
        [Result_2],
        [],
      ),
    'scanBooking' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(BookingId, BookingInfo))],
        ['query'],
      ),
    'updateBookingStatus' : IDL.Func([IDL.Text, BookingInfo], [], []),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
  return anon_class_13_1;
};
export const init = ({ IDL }) => { return []; };

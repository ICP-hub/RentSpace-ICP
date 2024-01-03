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
  const BookingInfo = IDL.Record({
    'paymentStatus' : IDL.Bool,
    'refundStatus' : IDL.Bool,
    'userId' : IDL.Text,
    'date' : IDL.Text,
    'bookingDuration' : IDL.Text,
    'paymentId' : IDL.Text,
    'cancelStatus' : IDL.Bool,
  });
  const ScanBooking = IDL.Record({
    'bookings' : IDL.Vec(BookingInfo),
    'nextKey' : IDL.Opt(IDL.Text),
  });
  const Booking = IDL.Service({
    'bookHotel' : IDL.Func([IDL.Text, BookingInfo], [], []),
    'getBookingDetials' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(BookingInfo)],
        ['query'],
      ),
    'getBookingId' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getPK' : IDL.Func([], [IDL.Text], ['query']),
    'scanBooking' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Bool)],
        [ScanBooking],
        ['query'],
      ),
    'skExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'transferCycles' : IDL.Func([], [], []),
    'updateBookingStatus' : IDL.Func([IDL.Text, BookingInfo], [], []),
  });
  return Booking;
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

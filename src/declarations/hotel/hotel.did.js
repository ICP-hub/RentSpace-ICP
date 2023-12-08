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
  const HotelInfo = IDL.Record({
    'hotelDes' : IDL.Text,
    'hotelImage' : IDL.Text,
    'hotelPrice' : IDL.Text,
    'hotelTitle' : IDL.Text,
    'hotelLocation' : IDL.Text,
  });
  const ScanHotels = IDL.Record({
    'nextKey' : IDL.Opt(IDL.Text),
    'hotels' : IDL.Vec(HotelInfo),
  });
  const Hotel = IDL.Service({
    'createHotel' : IDL.Func([IDL.Text, HotelInfo], [], []),
    'getHotel' : IDL.Func([IDL.Text], [IDL.Opt(HotelInfo)], ['query']),
    'getHotelId' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'getPK' : IDL.Func([], [IDL.Text], ['query']),
    'scanRent' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Bool)],
        [ScanHotels],
        ['query'],
      ),
    'skExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'transferCycles' : IDL.Func([], [], []),
    'updateHotel' : IDL.Func([IDL.Text, HotelInfo], [IDL.Opt(HotelInfo)], []),
  });
  return Hotel;
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
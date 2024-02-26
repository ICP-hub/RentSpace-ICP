export const idlFactory = ({ IDL }) => {
  const HotelInfo = IDL.Record({
    'hotelDes' : IDL.Text,
    'createdAt' : IDL.Text,
    'hotelImage' : IDL.Text,
    'hotelPrice' : IDL.Text,
    'hotelTitle' : IDL.Text,
    'hotelLocation' : IDL.Text,
  });
  const HotelId = IDL.Text;
  const anon_class_15_1 = IDL.Service({
    'createHotel' : IDL.Func([HotelInfo], [], []),
    'getHotel' : IDL.Func([HotelId], [IDL.Opt(HotelInfo)], ['query']),
    'scanHotel' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(HotelId, HotelInfo))],
        [],
      ),
    'updateHotel' : IDL.Func([HotelId, HotelInfo], [IDL.Opt(HotelInfo)], []),
    'whoami' : IDL.Func([], [IDL.Text], ['query']),
  });
  return anon_class_15_1;
};
export const init = ({ IDL }) => { return []; };

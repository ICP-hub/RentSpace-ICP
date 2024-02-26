import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type HotelId = string;
export interface HotelInfo {
  'hotelDes' : string,
  'createdAt' : string,
  'hotelImage' : string,
  'hotelPrice' : string,
  'hotelTitle' : string,
  'hotelLocation' : string,
}
export interface anon_class_15_1 {
  'createHotel' : ActorMethod<[HotelInfo], undefined>,
  'getHotel' : ActorMethod<[HotelId], [] | [HotelInfo]>,
  'scanHotel' : ActorMethod<[bigint, bigint], Array<[HotelId, HotelInfo]>>,
  'updateHotel' : ActorMethod<[HotelId, HotelInfo], [] | [HotelInfo]>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends anon_class_15_1 {}

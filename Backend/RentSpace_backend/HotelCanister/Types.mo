module {
    public type Year = Text;
    public type AnnualData = {
        jan : Nat;
        feb : Nat;
        march : Nat;
        april : Nat;
        may : Nat;
        june : Nat;
        july : Nat;
        aug : Nat;
        sep : Nat;
        oct : Nat;
        nov : Nat;
        dec : Nat;
    };
    public type UserId = Text;
    public type AdminId = Text;
    public type HotelId = Text;
    public type HotelInfo = {
        hotelTitle : Text;
        hotelDes : Text; 
        hotelImage : Text;
        hotelPrice : Text;
        hotelLocation : Text;
        hotelAvailableFrom : Text;
        hotelAvailableTill : Text;
        createdAt : Text;
        updatedAt : ?Text;
    };
};

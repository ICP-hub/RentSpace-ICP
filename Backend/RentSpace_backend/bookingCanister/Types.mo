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
    public type AdminId = Text;
    public type HotelId = Text;
    public type BookingId = Text;
    public type UserId = Text;
    public type BookingInfo = {
        userId : Text;
        date : Text;
        hotelId : Text;
        checkInDate : Text;
        cancelStatus : Bool;
        refundStatus : Bool;
        bookingDuration : BookingDuration;
        paymentStatus : Bool;
        paymentId : Text;
    };
    public type BookingDuration = {
        bookedAt : Text;
        bookedTill : Text;
    };
};

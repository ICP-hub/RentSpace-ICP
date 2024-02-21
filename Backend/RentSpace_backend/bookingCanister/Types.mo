module {
    public type AdminId  = Text;
    public type HotelId = Text;
    public type BookingId = Text;
    public type UserId = Text;
    public type BookingInfo = {
        userId : Text;
        date : Text;
        bookingDuration : Text;
        cancelStatus : Bool;
        refundStatus : Bool;
        paymentStatus : Bool;
        paymentId : Text;
    };
};

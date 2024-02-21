module {
    public type AdminId =Text;
    public type ReviewId = Text;
    public type UserId = Text;
    public type HotelId = Text;
    public type Review = {
        bookingId : Text;
        rating : Float;
        title : Text;
        des : Text;
        createdAt : Text;
    };
};

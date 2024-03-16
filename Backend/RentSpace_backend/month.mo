import Types "./bookingCanister/Types";
module {
    public func updateMonthData(month : Text, annualData : Types.AnnualData) : Types.AnnualData {
        if (month == "01") {
            return {
                jan = annualData.jan + 1;
                feb = annualData.feb;
                march = annualData.march;
                april = annualData.april;
                may = annualData.may;
                june = annualData.june;
                july = annualData.july;
                aug = annualData.aug;
                sep = annualData.sep;
                oct = annualData.oct;
                nov = annualData.nov;
                dec = annualData.dec;
            };

        };
        if (month == "02") {
            return {
                jan = annualData.jan;
                feb = annualData.feb + 1;
                march = annualData.march;
                april = annualData.april;
                may = annualData.may;
                june = annualData.june;
                july = annualData.july;
                aug = annualData.aug;
                sep = annualData.sep;
                oct = annualData.oct;
                nov = annualData.nov;
                dec = annualData.dec;
            };
        };
        if (month == "03") {
            return {
                jan = annualData.jan;
                feb = annualData.feb;
                march = annualData.march + 1;
                april = annualData.april;
                may = annualData.may;
                june = annualData.june;
                july = annualData.july;
                aug = annualData.aug;
                sep = annualData.sep;
                oct = annualData.oct;
                nov = annualData.nov;
                dec = annualData.dec;
            };
        };
        if (month == "04") {
            return {
                jan = annualData.jan;
                feb = annualData.feb;
                march = annualData.march;
                april = annualData.april + 1;
                may = annualData.may;
                june = annualData.june;
                july = annualData.july;
                aug = annualData.aug;
                sep = annualData.sep;
                oct = annualData.oct;
                nov = annualData.nov;
                dec = annualData.dec;
            };
        };
        if (month == "05") {
            return {
                jan = annualData.jan;
                feb = annualData.feb;
                march = annualData.march;
                april = annualData.april;
                may = annualData.may + 1;
                june = annualData.june;
                july = annualData.july;
                aug = annualData.aug;
                sep = annualData.sep;
                oct = annualData.oct;
                nov = annualData.nov;
                dec = annualData.dec;
            };
        };
        if (month == "06") {
            return {
                jan = annualData.jan;
                feb = annualData.feb;
                march = annualData.march;
                april = annualData.april;
                may = annualData.may;
                june = annualData.june +1;
                july = annualData.july;
                aug = annualData.aug;
                sep = annualData.sep;
                oct = annualData.oct;
                nov = annualData.nov;
                dec = annualData.dec;
            };
        };
        if (month == "07") {
            return {
                jan = annualData.jan;
                feb = annualData.feb;
                march = annualData.march;
                april = annualData.april;
                may = annualData.may;
                june = annualData.june;
                july = annualData.july + 1;
                aug = annualData.aug;
                sep = annualData.sep;
                oct = annualData.oct;
                nov = annualData.nov;
                dec = annualData.dec;
            };
        };
        if (month == "08") {
            return {
                jan = annualData.jan;
                feb = annualData.feb;
                march = annualData.march;
                april = annualData.april;
                may = annualData.may;
                june = annualData.june;
                july = annualData.july;
                aug = annualData.aug +1;
                sep = annualData.sep;
                oct = annualData.oct;
                nov = annualData.nov;
                dec = annualData.dec;
            };

        };
        if (month == "09") {
            return {
                jan = annualData.jan;
                feb = annualData.feb;
                march = annualData.march;
                april = annualData.april;
                may = annualData.may;
                june = annualData.june;
                july = annualData.july;
                aug = annualData.aug;
                sep = annualData.sep + 1;
                oct = annualData.oct;
                nov = annualData.nov;
                dec = annualData.dec;
            };
        };
        if (month == "10") {
            return {
                jan = annualData.jan;
                feb = annualData.feb;
                march = annualData.march;
                april = annualData.april;
                may = annualData.may;
                june = annualData.june;
                july = annualData.july;
                aug = annualData.aug;
                sep = annualData.sep;
                oct = annualData.oct + 1;
                nov = annualData.nov;
                dec = annualData.dec;
            };
        };
        if (month == "11") {
            return {
                jan = annualData.jan;
                feb = annualData.feb;
                march = annualData.march;
                april = annualData.april;
                may = annualData.may;
                june = annualData.june;
                july = annualData.july;
                aug = annualData.aug;
                sep = annualData.sep;
                oct = annualData.oct;
                nov = annualData.nov + 1;
                dec = annualData.dec;
            };
        };
        if (month == "12") {
            return {
                jan = annualData.jan;
                feb = annualData.feb;
                march = annualData.march;
                april = annualData.april;
                may = annualData.may;
                june = annualData.june;
                july = annualData.july;
                aug = annualData.aug;
                sep = annualData.sep;
                oct = annualData.oct;
                nov = annualData.nov;
                dec = annualData.dec + 1;
            };
        };
        return annualData;
    };
};

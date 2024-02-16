//Decides if canister ids used are of production or development
const production=true

export const host=(production)?"https://icp-api.io":"http://127.0.0.1:4943"

export const ids={
    userCan:(production)?
        // "tassb-3qaaa-aaaan-qloxq-cai":
        "5fiim-aiaaa-aaaan-qlqsq-cai":
        "by6od-j4aaa-aaaaa-qaadq-cai",
        
    hotelCan:(production)?
        "r5p4j-iyaaa-aaaan-qloya-cai":
        // "5mldq-waaaa-aaaan-qlqta-cai":
        "avqkn-guaaa-aaaaa-qaaea-cai",
        
    backendCan:(production)?
        // "thtuv-wiaaa-aaaan-qloxa-cai":
        "5cjoy-nqaaa-aaaan-qlqsa-cai":
        "be2us-64aaa-aaaaa-qaabq-cai",
    reviewCan:(production)?
        "rtnrb-tiaaa-aaaan-qloza-cai":
        "a4tbr-q4aaa-aaaaa-qaafq-cai",
    bookingCan:(production)?
        "r2o25-faaaa-aaaan-qloyq-cai":
        "asrmz-lmaaa-aaaaa-qaaeq-cai",
    tokenCan:(production)?
        "ryjl3-tyaaa-aaaaa-aaaba-cai"
        :"bw4dl-smaaa-aaaaa-qaacq-cai",
    commentCan:(production)?
        "d4pxt-taaaa-aaaan-qls5a-cai"
        :
        "",
}


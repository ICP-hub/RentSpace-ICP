//Decides if canister ids used are of production or development
const production=false

export const host=(production)?"https://icp-api.io":"http://127.0.0.1:4943"

export const ids={
    userCan:(production)?
        // "tassb-3qaaa-aaaan-qloxq-cai":
        "5fiim-aiaaa-aaaan-qlqsq-cai":
        "br5f7-7uaaa-aaaaa-qaaca-cai",
        
    hotelCan:(production)?
        // "r5p4j-iyaaa-aaaan-qloya-cai":'
        "5mldq-waaaa-aaaan-qlqta-cai":
        "bw4dl-smaaa-aaaaa-qaacq-cai",
        
    backendCan:(production)?
        // "thtuv-wiaaa-aaaan-qloxa-cai":
        "5cjoy-nqaaa-aaaan-qlqsa-cai":
        "be2us-64aaa-aaaaa-qaabq-cai",
    reviewCan:(production)?
        "rtnrb-tiaaa-aaaan-qloza-cai":
        "avqkn-guaaa-aaaaa-qaaea-cai",
    bookingCan:(production)?
        "r2o25-faaaa-aaaan-qloyq-cai":
        "b77ix-eeaaa-aaaaa-qaada-cai",
    tokenCan:(production)?
        "ryjl3-tyaaa-aaaaa-aaaba-cai"
        :"ryjl3-tyaaa-aaaaa-aaaba-cai",
}


//Decides if canister ids used are of production or development
const production=true

export const host=(production)?"https://icp-api.io":"http://127.0.0.1:4943"

export const ids={
    userCan:(production)?
        // "tassb-3qaaa-aaaan-qloxq-cai":
        "wenzb-uyaaa-aaaan-qlwsa-cai":
        "by6od-j4aaa-aaaaa-qaadq-cai",
        
    hotelCan:(production)?
        "wkpuj-piaaa-aaaan-qlwta-cai":
        // "5mldq-waaaa-aaaan-qlqta-cai":
        "avqkn-guaaa-aaaaa-qaaea-cai",
        
    backendCan:(production)?
        // "thtuv-wiaaa-aaaan-qloxa-cai":
        "5cjoy-nqaaa-aaaan-qlqsa-cai":
        "be2us-64aaa-aaaaa-qaabq-cai",
    reviewCan:(production)?
        "wdm7v-zaaaa-aaaan-qlwsq-cai":
        "a4tbr-q4aaa-aaaaa-qaafq-cai",
    bookingCan:(production)?
        "xhbqh-aaaaa-aaaan-qlwuq-cai":
        "asrmz-lmaaa-aaaaa-qaaeq-cai",
    tokenCan:(production)?
        "ryjl3-tyaaa-aaaaa-aaaba-cai"
        :"bw4dl-smaaa-aaaaa-qaacq-cai",
    commentCan:(production)?
        "wnos5-cqaaa-aaaan-qlwtq-cai"
        :
        "",
    supportCan:(production)?
        "xaawt-nyaaa-aaaan-qlwua-cai"
        :
        ""
}
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
    ICPtokenCan:(production)?
        "ryjl3-tyaaa-aaaaa-aaaba-cai"
        :"bw4dl-smaaa-aaaaa-qaacq-cai",
    ckBTCtokenCan:(production)?
        "mxzaz-hqaaa-aaaar-qaada-cai"
        :"mxzaz-hqaaa-aaaar-qaada-cai",
    ckETHtokenCan:(production)?
        "ss2fx-dyaaa-aaaar-qacoq-cai"
        :"ss2fx-dyaaa-aaaar-qacoq-cai",
    commentCan:(production)?
        "wnos5-cqaaa-aaaan-qlwtq-cai"
        :
        "",
    supportCan:(production)?
        "xaawt-nyaaa-aaaan-qlwua-cai"
        :
        ""
}

// {
//     "Review": {
//       "ic": "wdm7v-zaaaa-aaaan-qlwsq-cai"
//     },
//     "User": {
//       "ic": "wenzb-uyaaa-aaaan-qlwsa-cai"
//     },
//     "backend": {
//       "ic": "5cjoy-nqaaa-aaaan-qlqsa-cai"
//     },
//     "comment": {
//       "ic": "wnos5-cqaaa-aaaan-qlwtq-cai"
//     },
//     "hotel": {
//       "ic": "wkpuj-piaaa-aaaan-qlwta-cai"
//     },
//     "supportChat": {
//       "ic": "xaawt-nyaaa-aaaan-qlwua-cai"
//     }
//   }
// https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=xhbqh-aaaaa-aaaan-qlwuq-cai--> bookingcan
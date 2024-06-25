//Decides if canister ids used are of production or development
const production = false;

export const host = production ? 'https://icp-api.io' : 'http://127.0.0.1:4943';

export const nodeBackend = production ? 'https://rentspace.kaifoundry.com' : 'http://localhost:5000';

export const ids = {
  userCan: production
    ? 'xlygc-qqaaa-aaaao-a3odq-cai'
    // : 'a3shf-5eaaa-aaaaa-qaafa-cai',
    :"by6od-j4aaa-aaaaa-qaadq-cai",

  hotelCan: production
    ? 'wbxey-saaaa-aaaao-a3oeq-cai'
    // : 'aovwi-4maaa-aaaaa-qaagq-cai',
    :"be2us-64aaa-aaaaa-qaabq-cai",

  backendCan: production
    ? '5cjoy-nqaaa-aaaan-qlqsa-cai'
    : 'be2us-64aaa-aaaaa-qaabq-cai',
  reviewCan: production
    ? 'w2sy5-iyaaa-aaaao-a3oga-cai'
    // : 'asrmz-lmaaa-aaaaa-qaaeq-cai',
    :"bw4dl-smaaa-aaaaa-qaacq-cai",
  bookingCan: production
    ? 'wiupe-eiaaa-aaaao-a3ofa-cai'
    // : 'a4tbr-q4aaa-aaaaa-qaafq-cai',
    :"bkyz2-fmaaa-aaaaa-qaaaq-cai",
  ICPtokenCan: production
    ? 'ryjl3-tyaaa-aaaaa-aaaba-cai'
    : 'ryjl3-tyaaa-aaaaa-aaaba-cai', 
  ckBTCtokenCan: production
    ? 'mxzaz-hqaaa-aaaar-qaada-cai'
    : 'mxzaz-hqaaa-aaaar-qaada-cai',
  ckETHtokenCan: production
    ? 'ss2fx-dyaaa-aaaar-qacoq-cai'
    : 'ss2fx-dyaaa-aaaar-qacoq-cai',
  commentCan: production
    ? 'wpvjq-jqaaa-aaaao-a3ofq-cai'
    // : 'ajuq4-ruaaa-aaaaa-qaaga-cai',
    :"bd3sg-teaaa-aaaaa-qaaba-cai",
  supportCan: production
    ? 'wgwcm-7yaaa-aaaao-a3oea-cai'
    // : 'ahw5u-keaaa-aaaaa-qaaha-cai',
    :"b77ix-eeaaa-aaaaa-qaada-cai",
};

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

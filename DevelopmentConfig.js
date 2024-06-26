//Decides if canister ids used are of production or development
const production = false;

export const host = production ? 'https://icp-api.io' : 'http://127.0.0.1:4943';

export const nodeBackend = production ? 'https://rentspace.kaifoundry.com' : 'http://localhost:5000';

export const ids = {
  userCan: production
    ? 'ttotv-cyaaa-aaaao-a3o2a-cai'
    // : 'a3shf-5eaaa-aaaaa-qaafa-cai',
    :"by6od-j4aaa-aaaaa-qaadq-cai",

  hotelCan: production
    ? 'tilpq-yaaaa-aaaao-a3oyq-cai'
    // : 'aovwi-4maaa-aaaaa-qaagq-cai',
    :"be2us-64aaa-aaaaa-qaabq-cai",

  backendCan: production
    ? '5cjoy-nqaaa-aaaan-qlqsa-cai'
    : 'be2us-64aaa-aaaaa-qaabq-cai',
  reviewCan: production
    ? 'tbiem-oiaaa-aaaao-a3oza-cai'
    // : 'asrmz-lmaaa-aaaaa-qaaeq-cai',
    :"bw4dl-smaaa-aaaaa-qaacq-cai",
  bookingCan: production
    ? 'rsxhm-gqaaa-aaaao-a3oxq-cai'
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
    ? 'tpkje-vyaaa-aaaao-a3oya-cai'
    // : 'ajuq4-ruaaa-aaaaa-qaaga-cai',
    :"bd3sg-teaaa-aaaaa-qaaba-cai",
  supportCan: production
    ? 'tgjcy-dqaaa-aaaao-a3ozq-cai'
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

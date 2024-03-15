// import {
//     TransakWebView, Environments, Events, TransakConfig, EventTypes, Order,
//   } from '@transak/react-native-sdk';
import TransakWebView from '@transak/react-native-sdk'
  import { transak_key,transak_secret_phrase,environment } from '../../../../../../../../transakConfig';
import { createTokenActor } from '../utils/utils';
import { ids } from '../../../../../../../../DevelopmentConfig';

  const continueICPTransaction=async(amount,transfer,sendPrincipal,selfModal)=>{
    selfModal(false)
    const actorICP=createTokenActor(ids.tokenCan)
    transfer(amount,sendPrincipal,actorICP)
  }
  
  export function TransakWebViewIntegration(walletId,email,amount,transfer,sendPrincipal,selfModal,method,skipable) {
    let cryptoAmount=0
    const paymentMethods=['credit_debit_card','apple_pay','google_pay']
    let currentMethod=(
      method=="creditCard"?
      paymentMethods[0]:
      method=="applePay"?
      paymentMethods[1]:
      paymentMethods[2]
    )
    const transakConfig = {
      apiKey: transak_key, // (Required)
      environment: environment, // (Required)
    //   isTransakOne:true,
      cryptoCurrencyCode:"ICP",
      walletAddress:walletId,
      email:email,
      fiatAmount:amount,
      fiatCurrency:"USD",
      paymentMethod:currentMethod,
      hideMenu:true
      // isTransakOne:true
      // .....
      // For the full list of query params refer Props section below
    };
    

    const transakEventHandler = (event, data) => {
      console.log("event handler working")
      
      switch(event) {
        case 'ORDER_CREATED':
          console.log("order created!")
          alert('You may need to wait for few minutes, Please do not close the Payment screen!')
          skipable.current=false
          break
        case 'ORDER_PROCESSING':
          console.log('ORDER_PROCESSING')
          console.log(data.cryptoAmount);
          cryptoAmount=data.cryptoAmount;
          break;
  
        case 'ORDER_COMPLETED':
          console.log('order complete')
          console.log(cryptoAmount);
          continueICPTransaction(cryptoAmount,transfer,sendPrincipal,selfModal)
          skipable.current=true
          break;
  
        default:
          console.log("*");
      }
    };
  
    return (
      <TransakWebView
        queryParams={transakConfig}
        onTransakEventHandler={transakEventHandler}
        onLoad={()=>{
          console.log("loaded transak component!")
          // continueICPTransaction(amount,transfer,sendPrincipal,selfModal)
        }}
        onMessage={(message)=>console.log(message)}
        onError={(er)=>console.log(er)}
        // .....
        // For the full list of react-native-webview props refer Props section below
      />
    );
  }
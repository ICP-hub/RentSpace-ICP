import {payPalUrl} from '../../../../../../../../DevelopmentConfig';

const generateToken = async (paypalClientId, paypalSecret) => {
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append(
    'Authorization',
    // 'Basic ' + base64.encode(`${paypalClientId}:${paypalSecret}`),
    // using btoa() instead of base64.encode() because base64.encode() is not working
    'Basic ' + btoa(`${paypalClientId}:${paypalSecret}`),
  );

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: 'grant_type=client_credentials',
  };

  return new Promise((resolve, reject) => {
    fetch(`${payPalUrl}/v1/oauth2/token`, requestOptions)
      .then(response => response.json()) //response.text()
      .then(result => {
        console.log('result print : ', result.access_token);
        resolve(result.access_token);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const createOrder = async (token = '',price) => {

  console.log("Paypal price : ",price);

  let orderData = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: String(price),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: String(price),
            },
          },
        },
      },
    ],
    application_context: {
      return_url: 'https://example.com/return',
      cancel_url: 'https://example.com/cancel',
    },
  };

  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  };

  return new Promise((resolve, reject) => {
    fetch(`${payPalUrl}/v2/checkout/orders`, requestOptions)
      .then(response => response.json()) //response.text()
      .then(result => {
        console.log('result print : ', result);
        resolve(result);
      })
      .catch(error => {
        console.log('error rasised : ', error);
        reject(error);
      });
  });
};
const capturePayment = async (id, token = '') => {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`${payPalUrl}/v2/checkout/orders/${id}/capture`, requestOptions)
      .then(response => response.json()) //response.text()
      .then(result => {
        console.log('result print : ', result);
        resolve(result);
      })
      .catch(error => {
        console.log('error rasised : ', error);
        reject(error);
      });
  });
};

export default {generateToken, createOrder, capturePayment};

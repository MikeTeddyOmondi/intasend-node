const IntaSend = require('./intasend');

let intasend = new IntaSend(
  'ISPubKey_test_91ffc81a-8ac4-419e-8008-7091caa8d73f',
  'ISSecretKey_test_82ab1e88-d97f-45b0-bec1-c59f6f4cbd2e',
  true
);
let collection = intasend.collection();
collection
  .charge({
    first_name: 'FELIX',
    last_name: 'Cheruiyot',
    email: 'felix@intasend.com',
    host: 'https://stackblitz.com',
    amount: 10,
    currency: 'KES',
    api_ref: 'test',
  })
  .then((resp) => {
    console.log(`Charge Resp: ${resp}`);
  })
  .catch((err) => {
    console.log(`Charge error: ${err}`);
  });

collection
  .mpesaStkPush({
    phone_number: '254723890353',
    name: 'Felix Cheruiyot',
    email: 'felix@intasend.com',
    amount: 10,
    api_ref: 'test',
  })
  .then((resp) => {
    console.log(`Resp: ${resp}`);
  })
  .catch((err) => {
    console.error(`error: ${err}`);
  });

let wallet = intasend.wallet();
wallet
  .create({
    label: 'NodeJS-SDK-TEST',
    wallet_type: 'WORKING',
    currency: 'KES',
  })
  .then((resp) => {
    console.log(`Funding response: ${resp}`);
  })
  .catch((err) => {
    console.error(`Funding error: ${err}`);
  });

let payouts = intasend.payouts();
payouts
  .initiate({
    label: 'NodeJS-SDK-TEST',
    wallet_type: 'WORKING',
    currency: 'KES',
  })
  .then((resp) => {
    console.log(`Payouts response: ${resp}`);
    // Approve payouts
    payouts
      .approve(resp, false)
      .then((resp) => {
        console.log(`Payouts approve: ${resp}`);
      })
      .catch((err) => {
        console.error(`Payouts approve error: ${err}`);
      });
  })
  .catch((err) => {
    console.error(`Payouts error: ${err}`);
  });

let refunds = intasend.refunds();
refunds
  .create({
    invoice: 'INVOICE-NUMBER',
    amount: 200,
    reason: 'UNAVAIBLE',
    reason_details: 'Service unavailable',
  })
  .then((resp) => {
    console.log(`Invoice response: ${resp}`);
  })
  .catch((err) => {
    console.error(`Invoice error: ${err}`);
  });

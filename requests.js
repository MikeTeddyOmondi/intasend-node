const https = require('https');

class RequestClient {
  publishable_key;
  private_key;
  secret_key;
  prod_base_url = 'payment.intasend.com';
  test_base_url = 'sandbox.intasend.com';
  test_mode = true;
  constructor(publishable_key, secret_key, test_mode) {
    this.publishable_key = publishable_key;
    this.secret_key = secret_key;
    this.test_mode = test_mode;
  }
  send(payload, service_path, req_method) {
    let method = req_method || 'POST';
    return new Promise((resolve, reject) => {
      let base_url = this.prod_base_url;
      if (this.test_mode) {
        base_url = this.test_base_url;
      }
      let headers = { 'Content-Type': 'application/json' };
      if (this.secret_key) {
        headers['Authorization'] = `Bearer ${this.secret_key}`;
      }
      if (this.publishable_key) {
        payload['public_key'] = this.publishable_key;
      }
      const options = {
        hostname: base_url,
        port: 443,
        path: service_path,
        method: method,
        headers: headers,
      };
      const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        if (res.statusCode !== 201 && res.statusCode !== 200) {
          console.log(`Resp Code: ${res.statusCode}`);
          res.resume();
          res.on('data', (data) => {
            reject(data);
          });
          return;
        }
        console.log(`Resp Code: ${res.statusCode}`);
        res.on('data', (data) => {
          resolve(data);
          return;
        });
      });
      req.on('error', (err) => {
        reject(err.message);
        return;
      });
      if (payload) {
        req.write(JSON.stringify(payload));
      }
      req.end();
    });
  }
}

module.exports = RequestClient;
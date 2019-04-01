'use strict'
const Restify = require('restify');
const server = Restify.createServer({
  name: "MoneyBot"
});
const request = require('request');
const PORT = process.env.PORT || 3000;

server.use(Restify.plugins.bodyParser());
server.use(Restify.plugins.jsonp());

const convertCurrency = (amountToConvert, outputCurrency, cb) => {
  const {
    amount,
    currency
  } = amountToConvert;
  return request({
    url: "https://api.exchangeratesapi.io/latest",
    qs: {
      base: currency,
      symbols: outputCurrency
    },
    method: 'GET',
    json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      let computedValue = Math.round(body.rates[outputCurrency] * amount);
      cb(null, amount.toString() + currency + ' converts to about ' + outputCurrency + computedValue + ' as per current rates !');
    } else {
      cb(error, null);
    }
  });
}

// POST route handler
server.post('/', (req, res, next) => {
  let result = req.body.queryResult;

  if(result.action === 'convert') {
    const {amountToConvert, outputCurrency} = result.parameters;

    // Check if input currency code === output currency code
    if(amountToConvert.currency === outputCurrency) {
      const {amount, currency} = amountToConvert;

      let responseText = 'Well, ' + amount.toString() + currency + ' is obviously equal to ' + amount.toString() + currency;
      let response = {
        "fulfillmentText": responseText,
      }
      res.send(response);
    } else {
      // Query the fixer.io API to fetch and create a response
      convertCurrency(amountToConvert, outputCurrency, (error, result) => {
        if(!error && result) {
          let response = {
            "fulfillmentText": result,
          }
          res.send(response);
        }
      })
    }
  }

  return next();
});

server.listen(PORT, () => console.log('Moneybot running on PORT: ' + PORT));

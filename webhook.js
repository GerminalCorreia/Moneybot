'use strict'
const Restify = require('restify');
const server = Restify.createServer({
  name: "MoneyBot"
})
const PORT = process.env.PORT || 3000;

server.use(Restify.plugins.bodyParser());
server.use(Restify.plugins.jsonp());

// POST route handler
server.post('/', (req, res, next) => {
  let result = req.body.queryResult;

  console.log(result);

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
    }
  }

  return next();
});

server.listen(PORT, () => console.log('Moneybot running on PORT: ' + PORT));

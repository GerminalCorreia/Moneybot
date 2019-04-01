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
  const {amountToConvert, outputCurrency} = result.parameters;

  console.log(amountToConvert);
  console.log(outputCurrency);

  return next();
});

server.listen(PORT, () => console.log('Moneybot running on PORT: ' + PORT));

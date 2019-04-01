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
  let {
    status,
    result
  } = req.body;

  console.log(result);

  return next();
});

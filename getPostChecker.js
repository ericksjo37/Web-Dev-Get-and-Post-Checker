var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 51521);

app.get('/getPostChecker',function(req,res){
  var getQueryParams = [];
  for (var prop in req.query) {
	 getQueryParams.push({'name':prop,'value':req.query[prop]})
  }
  var context = {};
  context.passedQueryData = getQueryParams;
  context.requestType = 'GET';
  res.render('requestReceivedAs', context);
});

app.post('/getPostChecker', function(req,res){
  var postQueryParams = [];
  var postBodyParams = [];
  for (var prop in req.query){
    postQueryParams.push({'name':prop,'value':req.query[prop]})
  }
  for (var prop in req.body){
    postBodyParams.push({'name':prop,'value':req.body[prop]})
  }
  
  var context = {};
  context.passedBodyData = postBodyParams;
  context.passedQueryData = postQueryParams;
  context.requestType = 'POST';
  res.render('requestReceivedAs', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

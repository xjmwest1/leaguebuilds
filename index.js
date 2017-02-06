var express = require('express')
var app = express()
var routes = require('./routes/routes')

app.use(express.static('public'))
app.use('/data', routes)

app.get('/', function(req, res, next) {
    res.sendFile('/public/index.html', { root: __dirname })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
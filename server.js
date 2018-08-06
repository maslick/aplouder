var connect = require('connect');
var serveStatic = require('serve-static');
var open = require('open');

var port = process.env.PORT || 9990;
connect().use(serveStatic(".")).listen(port, "0.0.0.0", function(){
    console.log('Server running on port ' + port);
    if (port==9990) open("http://0.0.0.0:9990");
});

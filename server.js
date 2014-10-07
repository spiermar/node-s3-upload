/**
 * Don't hard-code your credentials!
 * Export the following environment variables instead:
 *
 * export AWS_ACCESS_KEY_ID='AKID'
 * export AWS_SECRET_ACCESS_KEY='SECRET'
 */

var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 4567,
    AWS = require('aws-sdk'),
    s3;

AWS.config.region = 'us-west-2';
s3 = new AWS.S3();

function getSignedUrl (bucket, key) {
	var params = { Bucket: bucket, Key: key };
	return s3.getSignedUrl('putObject', params);
}

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.get("/signedurl", function (req, res) {
  res.json({ "url" : getSignedUrl('handson-upload', 'videos/img1.jpg') })
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("Simple static server listening at http://localhost:" + port);
app.listen(port);
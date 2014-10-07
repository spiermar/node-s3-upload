/**
 * Don't hard-code your credentials!
 * Export the following environment variables instead:
 *
 * export AWS_ACCESS_KEY_ID='AKID'
 * export AWS_SECRET_ACCESS_KEY='SECRET'
 */

var express = require("express"),
	crypto = require('crypto'),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 4567,
    awsbucket = process.env.AWS_S3_BUCKET || 'yourbucketname';

function getUploadPolicy (bucket, key) {
	var expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    var policy = {
        expiration: expiration.toISOString(),
        conditions: [
            { bucket: bucket },
            [ "starts-with", "$key", key ],
            { acl: "private" }
        ]
    };

    var policyString = JSON.stringify(policy);

    var encodedPolicyString = new Buffer(policyString).toString("base64");

    var awsKeyId = process.env.AWS_ACCESS_KEY;
    var awsKey = process.env.AWS_SECRET_KEY;


    var hmac = crypto.createHmac("sha1", awsKey);
    hmac.update(encodedPolicyString);

    var digest = hmac.digest('base64');

    return { awskeyid: awsKeyId, policy: encodedPolicyString, signature: digest, keyname: key }
}

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.get("/uploadpolicy", function (req, res) {
  res.json(getUploadPolicy(awsbucket, 'inbox/'))
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
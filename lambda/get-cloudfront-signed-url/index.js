/*jshint esversion: 6 */

exports.handler = function (event, context, callback) {
    'use strict';
    const CLOUDFRONT_DEMO_URL = "https://d2tbth1rkwpwrt.cloudfront.net/Wildlife.mp4";
    let fs = require('fs');
    let aws = require('aws-sdk');
    let pem = fs.readFileSync('cryptoKey/pk-APKAIKRB425ZJXFVO5SA.pem');
    let privateKeyString = pem.toString('ascii');
    let keyPairId = 'APKAIKRB425ZJXFVO5SA';
    var signer = new aws.CloudFront.Signer(keyPairId, privateKeyString);
    var expires = Math.round(+new Date()/1000) + 365*24*60*60; /* 365 days */
    var policy = {
        Statement : [
            {
                Resource : CLOUDFRONT_DEMO_URL,
                Condition: { DateLessThan: { 'AWS:EpochTime': expires } }
            }
        ]
    };
    var urlOptions = '';
    urlOptions = {
        url: CLOUDFRONT_DEMO_URL,
        policy: JSON.stringify(policy)
    };
    const signedURL = signer.getSignedUrl(urlOptions);
    context.callbackWaitsForEmptyEventLoop = false;
    callback(null, signedURL);
};

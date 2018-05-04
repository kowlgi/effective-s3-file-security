var s3en = require('node-s3-encryption-client');
var aws_config = require('./config.js').aws_config;
var AWS = require("aws-sdk");
AWS.config.update(aws_config);
var s3 = new AWS.S3();

const ENCRYPTION_DEMO_BUCKET = "clientside-encryption-demo-bucket";
const SIGNING_DEMO_BUCKET = "signing-demo-bucket";
const ENCRYPTION_CMK_ARN = "arn:aws:kms:us-east-1:311629526619:key/a2b8864e-99f1-4408-ad3a-e7ee2a129fd2"
const SIGNING_DEMO_URL = "https://signing-demo-bucket.s3.amazonaws.com/Wildlife.mp4";
const SIGNING_DEMO_OBJECT_KEY = "Wildlife.mp4";
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello world',
        navaction: 'Log In',
        putfile: '',
        putobjectdata: '',
        getfile: '',
        enableEncryption: false,
        encrypterrormessage: '',
        encryptsuccessmessage: '',
        enableDecryption: false,
        decrypterrormessage: '',
        decryptsuccessmessage: '',
        getpresignedurl: false,
        presignedurltitle: '👎 Using Normal URL',
        presignedurlenabled: false,
        urlforpresigneddemo: SIGNING_DEMO_URL,
        presignedurlerrormessage: '',
        presignedurlsuccessmessage: '',
        getsignedurlfilename: '',
        getsignedurl: false,
        getsignedurlsuccessmessage: '',
        getsignedurlerrormessage: '',
        getsignedcookiefilename: '',
        getsignedcookie: false,
        getsignedcookiesuccessmessage: '',
        getsignedcookieerrormessage: ''
    },
    mounted: function(){
        this.$refs.presigneddemovideo.addEventListener('error', this.presignedDemoVideoError);
    },
    methods: {
        uploadEncryptedFile(){
            const parent = this;
            this.encryptsuccessmessage = '';
            this.encrypterrormessage = '';
            if(this.enableEncryption) {
                s3en.putObject(aws_config, {Body: this.putobjectdata, Key: this.putfile, Bucket: ENCRYPTION_DEMO_BUCKET, KmsParams: {KeyId: ENCRYPTION_CMK_ARN, KeySpec: "AES_256"}}, function(error, data){
                    if(error) {
                        parent.encrypterrormessage = error;
                    } else {
                        parent.encryptsuccessmessage = "File upload complete."
                    }
                });
            } else {
                s3.putObject({Body: this.putobjectdata, Key: this.putfile, Bucket: ENCRYPTION_DEMO_BUCKET}, function(error, data){
                    if(error) {
                        parent.encrypterrormessage = error;
                    } else {
                        parent.encryptsuccessmessage = "File upload complete."
                    }
                });
            }
        },
        downloadAndDecryptFile(){
            const parent = this;
            this.decryptsuccessmessage = '';
            this.decrypterrormessage = '';
            if(this.enableDecryption) {
                s3en.getObject(aws_config, {Key: this.getfile, Bucket: ENCRYPTION_DEMO_BUCKET}, function(error, data){
                    if(error) {
                        parent.decrypterrormessage = error;
                    } else {
                        parent.decryptsuccessmessage = "File contents: \"" + data.Body + "\"";
                    }
                });
            } else {
                s3.getObject({Key: this.getfile, Bucket: ENCRYPTION_DEMO_BUCKET}, function(error, data){
                    if(error) {
                        parent.decrypterrormessage = error;
                    } else {
                        parent.decryptsuccessmessage = "File contents: \"" + data.Body + "\"";
                    }
                });
            }
        },
        togglePresignedURL(){
            this.presignedurlerrormessage = '';
            if(this.presignedurlenabled) {
                this.presignedurlenabled = false;
                this.urlforpresigneddemo = SIGNING_DEMO_URL;
                this.presignedurltitle = '👎 Using Normal URL';
            } else {
                this.presignedurlenabled = true;
                this.urlforpresigneddemo = s3.getSignedUrl('getObject', {Key: SIGNING_DEMO_OBJECT_KEY, Bucket: SIGNING_DEMO_BUCKET});
                this.presignedurltitle = '👍 Using Pre-signed URL';
            }
        },
        presignedDemoVideoError(event){
            event.preventDefault();
            this.presignedurlerrormessage = "Error: Cannot play video.";
        },
        downloadSignedURLFile(){

        },
        downloadSignedCookieFile(){

        }
    }
});

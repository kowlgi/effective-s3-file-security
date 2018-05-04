var s3en = require('node-s3-encryption-client');
var aws_config = require('./config.js').aws_config;
var AWS = require("aws-sdk");
AWS.config.update(aws_config);
var s3 = new AWS.S3();
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello world',
        navaction: 'Log In',
        putfile: '',
        putobjectdata: '',
        getfile: '',
        enableEncryption: false,
        enableDecryption: false,
        encrypterrormessage: '',
        encryptsuccessmessage: '',
        decrypterrormessage: '',
        decryptsuccessmessage: ''
    },
    methods: {
        uploadEncryptedData(){
            const parent = this;
            this.encryptsuccessmessage = '';
            this.encrypterrormessage = '';
            if(this.enableEncryption) {
                s3en.putObject(aws_config, {Body: this.putobjectdata, Key: this.putfile, Bucket: 'houston-techfest-bucket', KmsParams: {KeyId: 'arn:aws:kms:us-east-1:311629526619:key/a2b8864e-99f1-4408-ad3a-e7ee2a129fd2', KeySpec: "AES_256"}}, function(error, data){
                    if(error) {
                        parent.encrypterrormessage = error;
                    } else {
                        parent.encryptsuccessmessage = "File upload complete."
                    }
                });
            } else {
                s3.putObject({Body: this.putobjectdata, Key: this.putfile, Bucket: 'houston-techfest-bucket'}, function(error, data){
                    if(error) {
                        parent.encrypterrormessage = error;
                    } else {
                        parent.encryptsuccessmessage = "File upload complete."
                    }
                });
            }
        },
        downloadAndDecryptData(){
            const parent = this;
            this.decryptsuccessmessage = '';
            this.decrypterrormessage = '';
            if(this.enableDecryption) {
                s3en.getObject(aws_config, {Key: this.getfile, Bucket: 'houston-techfest-bucket'}, function(error, data){
                    if(error) {
                        parent.decrypterrormessage = error;
                    } else {
                        parent.decryptsuccessmessage = "File contents: \"" + data.Body + "\"";
                    }
                });
            } else {
                s3.getObject({Key: this.getfile, Bucket: 'houston-techfest-bucket'}, function(error, data){
                    if(error) {
                        parent.decrypterrormessage = error;
                    } else {
                        parent.decryptsuccessmessage = "File contents: \"" + data.Body + "\"";
                    }
                });
            }
        }
    }
});

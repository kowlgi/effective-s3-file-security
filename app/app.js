var s3en = require('node-s3-encryption-client');
var aws_config = require('./config.js').aws_config;
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello world',
        navaction: 'Log In',
        putfile: '',
        putobjectdata: '',
        getobjectdata: '',
        getfile: '',
        enableEncryption: false,
        enableDecryption: false
    },
    methods: {
        uploadEncryptedData(){
            s3en.putObject(aws_config, {Body: this.putobjectdata, Key: this.putfile, Bucket: 'houston-techfest-bucket', KmsParams: {KeyId: 'arn:aws:kms:us-east-1:311629526619:key/a2b8864e-99f1-4408-ad3a-e7ee2a129fd2', KeySpec: "AES_256"}}, function(data){
                console.log(data);
            });
        },
        downloadAndDecryptData(){
            const parent = this;
            s3en.getObject(aws_config, {Key: this.getfile, Bucket: 'houston-techfest-bucket'}, function(error, data){
                console.log(data);
                parent.getobjectdata = data.Body;
            });
        }
    }
});

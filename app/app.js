var s3en = require('node-s3-encryption-client');
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello world',
        navaction: 'Log In',
        putobjectdata: '',
        getobjectdata: ''
    },
    methods: {
        uploadEncryptedData(){
            s3en.putObject({Body: this.putobjectdata, Key: 'test', Bucket: 'houston-techfest-bucket', KmsParams: {KeyId: 'arn:aws:kms:us-east-1:311629526619:key/a2b8864e-99f1-4408-ad3a-e7ee2a129fd2', KeySpec: "AES_256"}}, function(data){
                console.log(data);
            });
            console.log("sone putting done");
        },
        downloadAndDecryptData(){
            const parent = this;
            s3en.getObject({Key: 'test', Bucket: 'houston-techfest-bucket'}, function(error, data){
                parent.getobjectdata = data.Body;
            });
        }
    }
});

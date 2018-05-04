#!/bin/bash

aws --profile techfest s3 mb s3://signing-demo-bucket && \
aws --profile techfest s3api put-bucket-policy --bucket signing-demo-bucket --policy file://signing-demo-bucket-policy.json && \
aws --profile techfest s3api put-bucket-cors --bucket signing-demo-bucket --cors-configuration file://signing-demo-bucket-cors.json

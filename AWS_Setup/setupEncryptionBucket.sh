#!/bin/bash

aws --profile techfest s3 mb s3://clientside-encryption-demo-bucket && \
aws --profile techfest s3api put-bucket-policy --bucket clientside-encryption-demo-bucket --policy file://clientside-encryption-demo-bucket-policy.json && \
aws --profile techfest s3api put-bucket-cors --bucket clientside-encryption-demo-bucket --cors-configuration file://clientside-encryption-demo-bucket-cors.json

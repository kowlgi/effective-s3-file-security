#!/bin/bash

aws --profile techfest cloudfront create-distribution --origin-domain-name techfest-cloudfront-demo-bucket.s3.amazonaws.com

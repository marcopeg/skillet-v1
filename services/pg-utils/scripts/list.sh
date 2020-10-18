#!/bin/bash
set -e

echo "loading from s3://${AWS_BUCKET_NAME}/${AWS_BUCKET_PATH}...."
#aws s3 ls s3://${AWS_BUCKET_NAME}/${AWS_BUCKET_PATH} --recursive | sort | tail -n 5

aws s3api list-objects-v2 \
    --bucket "${AWS_BUCKET_NAME}" \
    --query 'reverse(sort_by(Contents, &LastModified))[:5].Key'
    # --output=text

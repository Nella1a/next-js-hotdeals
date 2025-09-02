#! /usr/bin/env bash

export IMAGE_TAG=$1
docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up --detach
echo "success"
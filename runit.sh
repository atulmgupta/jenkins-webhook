#!/bin/bash
docker rm -f jenkinswebhook
docker build -t atul/jenkinswebhook .
docker run --name jenkinswebhook --restart always -p 8090:8090 -d atul/jenkinswebhook 
#!/bin/bash

containerName="github-proxy-test"
tag="github-proxy:0.0.0"

docker rm -f $containerName
docker rmi -f $tag

docker build . -t $tag
docker run -d -it -p 8080:80 --name $containerName $tag
#!/bin/bash

version=$1
if [ -z "$version" ]; then
    version=latest
fi

tag=ghcr.io/xclhove/github-proxy:$version
docker build . -t $tag
echo $GH_PAT | docker push $tag
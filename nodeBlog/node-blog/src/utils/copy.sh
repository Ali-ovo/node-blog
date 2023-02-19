#! /bin/sh
cd /e/AllCode/ProjectTtest/Node/nodeBlog/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
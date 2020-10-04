#/bin/sh

# Run the nginx template:
/usr/bin/dockerize -template /nginx.conf.tmpl:/etc/nginx/nginx.conf

# Start NGiNX
nginx -g 'daemon off;'
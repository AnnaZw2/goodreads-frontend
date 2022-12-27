#!/bin/sh
echo "Using API_URL: ${API_URL}"
echo -e "window._env_ = {API_URL:'${API_URL:-http://localhost:8000/api}', DEPLOYMENT_DATE:'${DEPLOYMENT_DATE:-not-set}'}" > /usr/share/nginx/html/env-config.js
/usr/sbin/nginx -g "daemon off;"

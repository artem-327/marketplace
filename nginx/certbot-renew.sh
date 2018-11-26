#!/bin/sh

# Call certbot to obtain or renew certificates
certbot certonly -v -n --manual --preferred-challenges=dns --server https://acme-v02.api.letsencrypt.org/directory --manual-auth-hook authenticator_godaddy.sh --manual-cleanup-hook cleanup_godaddy.sh --manual-public-ip-logging-ok --email "info@artio.cz" --agree-tos -d "*.echoexchange.net" && renew=1

# If successfull, restart nginx
#[ "$renew" = 1 ] && nginx -s reload
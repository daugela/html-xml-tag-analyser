#!/bin/bash -x
python backend/manage.py migrate --noinput
python backend/manage.py runserver 0.0.0.0:8000
exec "$@"
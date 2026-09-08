FROM python:3.12-slim

ENV IDB_HOST=0.0.0.0
ENV IDB_PORT=8000
ENV IDB_DB_PATH=/data/ic_denetim.db
ENV IDB_OPEN_BROWSER=0

WORKDIR /app

COPY . .

RUN mkdir -p /data

EXPOSE 8000

CMD ["python", "app.py"]

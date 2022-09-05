FROM golang:1.18

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN go build -o client .

RUN chmod +x /app/client

CMD [ "/app/client" ]

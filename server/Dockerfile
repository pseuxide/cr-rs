FROM rust:1.75-slim-buster

RUN apt-get update -y \
    && apt-get install -y libpq-dev build-essential

ADD . /source
WORKDIR /source

RUN cargo install diesel_cli --no-default-features --features postgres

RUN cargo build --release

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["./target/release/crud-rust"]

EXPOSE 8080
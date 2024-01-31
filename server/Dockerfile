FROM rust

ADD . /source
WORKDIR /source

RUN cargo install diesel_cli --no-default-features --features postgres
RUN cargo build --release
RUN diesel migration run --database-url 'postgres://postgres:IamPseuxide1@34.85.63.27:5432/crudrustdb?sslmode=disable'

CMD ["./target/release/crud-rust"]

EXPOSE 8080

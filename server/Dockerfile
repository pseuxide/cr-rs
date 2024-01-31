FROM rust

ADD . /source
WORKDIR /source

RUN cargo install diesel_cli --no-default-features --features postgres
RUN cargo build --release
RUN diesel migration run

EXPOSE 8080
CMD ["./target/release/crud-rust"]

FROM rust

ADD . /source
WORKDIR /source

RUN cargo build --release

EXPOSE 8080
CMD ["./target/release/crud-rust"]

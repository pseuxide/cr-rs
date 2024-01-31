FROM rust

ADD . /source
WORKDIR /source

RUN cargo build --release

CMD cargo run
EXPOSE 8080
ENTRYPOINT ["target/release/crud-rust"]

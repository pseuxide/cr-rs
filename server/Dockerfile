FROM rust as builder

RUN apt-get update -y \
    && apt-get install -y libpq-dev build-essential

WORKDIR /source
ADD . /source

RUN cargo install diesel_cli --no-default-features --features postgres
RUN cargo build --release

# Start a new stage for the runtime environment
FROM ubuntu:22.04

# Install runtime dependencies
RUN apt-get update -y && apt-get install -y libpq5 && rm -rf /var/lib/apt/lists/*

# Copy the built executable and any other necessary files
COPY --from=builder /source/target/release/crud-rust /usr/local/bin/
COPY --from=builder /source/entrypoint.sh /entrypoint.sh

COPY --from=builder /usr/local/cargo/bin/diesel /usr/local/bin/diesel

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["crud-rust"]

EXPOSE 8080

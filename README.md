# rust-backend-sample

a chunk of backend, frontend and infrastructure code that i made with bonus github actions to automatically deploy server to GCP.
infra - docker compose with postgresql setup locally
server - actix-web backend and diesel ormapper

## infra
```
$ cd infra
$ docker network create crud-rust_network
$ docker compose up --build -d
$ docker compose logs -f
```

## server
```
$ cd server

$ cargo install diesel_cli --no-default-features --features postgres
$ diesel migration run

$ cargo install cargo-watch
$ cargo watch -x 'run'
```

## front
```
$ cd front
$ yarn install
$ yarn dev
```

http://localhost:3000

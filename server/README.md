
# データベース構築

# cargo-watch
```
$ cargo install cargo-watch

$ cargo watch -x 'run'
```

# diesel
https://github.com/diesel-rs/diesel
Rust用ORM

# install
```
$ cargo install diesel_cli --no-default-features --features postgres
  Installed package `diesel_cli v1.4.1` (executable `diesel`)
```

# setup
```
$ diesel setup
Creating migrations directory at: /Users/dongri/go/src/github.com/dongri/crud-rust/server/migrations
```
migrations ディレクトリと diesel.toml ファイルが作成される

# dependencies 
```
[dependencies]
diesel = { version = "1.4.4", features = ["postgres", "chrono"] }
chrono = "=0.4.11"
dotenv = "0.15.0"
```
.envファイルを作成して、DB接続URLを記述する
```
DATABASE_URL=postgres://postgres@localhost:5432/crud-rust
```

# migrations generate
```
$ diesel migration generate create_post_table
Creating migrations/2022-08-23-071448_create_post_table/up.sql
Creating migrations/2022-08-23-071448_create_post_table/down.sql
```
up.sqlにcreate table分、down.sqlにdrop table分が追加

# migrations run
```
$ diesel migration run
Running migration 2022-08-23-071448_create_post_table
```
データベースにテーブルが作成されることを確認
src/schema.rsにUserクラスを定義していることを確認
```
table! {
    post (id) {
        id -> Int4,
        title -> Varchar,
        body -> Text,
        created -> Timestamptz,
        updated -> Timestamptz,
    }
}
```

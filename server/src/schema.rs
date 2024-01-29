// @generated automatically by Diesel CLI.

diesel::table! {
    posts (id) {
        id -> Varchar,
        title -> Nullable<Varchar>,
        body -> Nullable<Text>,
        created -> Timestamp,
        updated -> Timestamp,
    }
}

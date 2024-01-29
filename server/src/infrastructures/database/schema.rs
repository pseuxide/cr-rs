table! {
    posts (id) {
        id -> VarChar,
        title -> Varchar,
        body -> Varchar,
        created -> Timestamptz,
        updated -> Timestamptz,
    }
}

table! {
    users (id) {
        id -> Int4,
        name -> Varchar,
        email -> Varchar,
        password -> Varchar,
        created -> Timestamptz,
        updated -> Timestamptz,
    }
}

allow_tables_to_appear_in_same_query!(posts, users,);

use crate::infrastructures::database::schema::posts;
use chrono::NaiveDateTime;
use diesel::result::Error;
use serde::*;

#[derive(Queryable, Serialize, Insertable, AsChangeset)]
#[table_name = "posts"]
pub struct Post {
    pub id: String,
    pub title: String,
    pub body: String,
    pub created: NaiveDateTime,
    pub updated: NaiveDateTime,
}

pub trait PostRepository {
    fn list(&self) -> Result<Vec<Post>, Error>;
    fn get(&self, post_id: String) -> Result<Post, Error>;
    fn create(&self, post: &Post) -> Result<(), diesel::result::Error>;
    fn update(&self, post: &Post) -> Result<(), diesel::result::Error>;
    fn delete(&self, post_id: String) -> Result<(), diesel::result::Error>;
}

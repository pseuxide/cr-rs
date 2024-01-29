use crate::domains::post::Post;
use crate::domains::post::PostRepository;
use crate::infrastructures::database::schema::posts::dsl::*;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

// This struct is basically a query manager. All the methods that it
// provides are static, making it a convenient abstraction for
// interacting with the database.
pub struct PostDao;

// Note that all the function names here map directly onto the function names
// associated with the QueryRoot and MutationRoot structs.
// This is NOT necessary but I personally prefer it.
impl PostDao {
    pub fn all_posts(conn: &PgConnection) -> Result<Vec<Post>, diesel::result::Error> {
        posts.load::<Post>(conn)
        // graphql_translate(res)
    }
}

pub struct PostRepositoryImpl {
    pub conn: r2d2::PooledConnection<ConnectionManager<PgConnection>>,
}

impl PostRepository for PostRepositoryImpl {
    fn list(&self) -> Result<Vec<Post>, diesel::result::Error> {
        posts.load::<Post>(&self.conn)
    }

    fn get(&self, post_id: String) -> Result<Post, diesel::result::Error> {
        posts.find(post_id).first(&self.conn)
    }

    fn create(&self, post: &Post) -> Result<(), diesel::result::Error> {
        let res = diesel::insert_into(posts).values(post).execute(&self.conn);
        match res {
            Ok(_) => Ok(()),
            Err(e) => Err(e),
        }
    }

    fn update(&self, post: &Post) -> Result<(), diesel::result::Error> {
        let res = diesel::update(posts.find(post.id.clone()))
            .set(post)
            .execute(&self.conn);
        match res {
            Ok(_) => Ok(()),
            Err(e) => Err(e),
        }
    }

    fn delete(&self, post_id: String) -> Result<(), diesel::result::Error> {
        let res = diesel::delete(posts.find(post_id)).execute(&self.conn);
        match res {
            Ok(_) => Ok(()),
            Err(e) => Err(e),
        }
    }
}

use crate::domains::post::{Post, PostRepository};
use crate::infrastructures::repository::post::PostRepositoryImpl;
use diesel::result::Error;
use uuid::Uuid;

pub struct PostUseCase {
    pub repository: PostRepositoryImpl,
}

impl PostUseCase {
    pub fn new(repository: PostRepositoryImpl) -> Self {
        PostUseCase { repository }
    }

    pub fn create(&self, title: String, body: String) -> Result<(), Error> {
        let id = Uuid::new_v4();
        let post = Post {
            id: id.to_string(),
            title,
            body,
            created: chrono::Utc::now().naive_utc(),
            updated: chrono::Utc::now().naive_utc(),
        };
        self.repository.create(&post)
    }

    pub fn list(&self) -> Result<Vec<Post>, Error> {
        self.repository.list()
    }

    pub fn get(&self, id: String) -> Result<Post, Error> {
        self.repository.get(id)
    }

    pub fn update(&self, id: String, title: String, body: String) -> Result<(), Error> {
        let post = Post {
            id,
            title,
            body,
            created: chrono::Utc::now().naive_utc(),
            updated: chrono::Utc::now().naive_utc(),
        };
        self.repository.update(&post)
    }

    pub fn delete(&self, id: String) -> Result<(), Error> {
        self.repository.delete(id)
    }
}

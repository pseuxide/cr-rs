use crate::domains::post::Post;
use crate::infrastructures::database::postgres::PostgresPool;
use crate::infrastructures::repository::post::PostRepositoryImpl;
use crate::usecases::post::PostUseCase;
use actix_web::{delete, get, post, put, web, HttpResponse};
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
struct Posts {
    posts: Vec<Post>,
}

#[derive(Deserialize)]
pub struct PostParams {
    title: String,
    body: String,
}

#[derive(Serialize)]
struct PostRes {
    post: Post,
}

#[derive(Serialize)]
struct APIResult {
    result: String,
}

#[derive(Serialize)]
struct APIError {
    error: String,
}

#[get("/posts")]
async fn posts(data: web::Data<PostgresPool>) -> HttpResponse {
    let usecase = PostUseCase::new(PostRepositoryImpl {
        conn: data.get().unwrap(),
    });
    let res = usecase.list();
    match res {
        Ok(res) => HttpResponse::Ok().json(Posts { posts: res }),
        Err(err) => HttpResponse::InternalServerError().body(format!("{}", err)),
    }
}

#[get("/posts/{id}")]
async fn get(data: web::Data<PostgresPool>, id: web::Path<String>) -> HttpResponse {
    let post_id = id.into_inner();
    let usecase = PostUseCase::new(PostRepositoryImpl {
        conn: data.get().unwrap(),
    });

    let res = usecase.get(post_id);
    match res {
        Ok(res) => HttpResponse::Ok().json(PostRes { post: res }),
        Err(err) => HttpResponse::InternalServerError().body(format!("{}", err)),
    }
}

#[post("/posts/new")]
async fn create(data: web::Data<PostgresPool>, post_params: web::Json<PostParams>) -> HttpResponse {
    let usecase = PostUseCase::new(PostRepositoryImpl {
        conn: data.get().unwrap(),
    });
    let res = usecase.create(post_params.title.clone(), post_params.body.clone());
    match res {
        Ok(_) => HttpResponse::Ok().json(APIResult {
            result: "success".to_string(),
        }),
        Err(err) => HttpResponse::InternalServerError().json(APIError {
            error: err.to_string(),
        }),
    }
}

#[put("/posts/{id}")]
async fn update(
    data: web::Data<PostgresPool>,
    id: web::Path<String>,
    post_params: web::Json<PostParams>,
) -> HttpResponse {
    let post_id = id.into_inner();
    let usecase = PostUseCase::new(PostRepositoryImpl {
        conn: data.get().unwrap(),
    });
    let res = usecase.update(post_id, post_params.title.clone(), post_params.body.clone());
    match res {
        Ok(_) => HttpResponse::Ok().json(APIResult {
            result: "success".to_string(),
        }),
        Err(err) => HttpResponse::InternalServerError().body(format!("{}", err)),
    }
}

#[delete("/posts/{id}")]
async fn delete(data: web::Data<PostgresPool>, id: web::Path<String>) -> HttpResponse {
    let post_id = id.into_inner();
    let usecase = PostUseCase::new(PostRepositoryImpl {
        conn: data.get().unwrap(),
    });
    let res = usecase.delete(post_id);
    match res {
        Ok(_) => HttpResponse::Ok().json(APIResult {
            result: "success".to_string(),
        }),
        Err(err) => HttpResponse::InternalServerError().body(format!("{}", err)),
    }
}

// this function could be located in a different module
pub fn api_config(cfg: &mut web::ServiceConfig) {
    cfg.service(posts)
        .service(get)
        .service(create)
        .service(update)
        .service(delete);
}

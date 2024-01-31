use actix_cors::Cors;
use actix_web::http::header;
use actix_web::middleware::Logger;
use actix_web::{ web, App, HttpServer };
use crud_rust::api;
use crud_rust::infrastructures::database::postgres::pg_pool;
use std::env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    logging_setup();

    // Retrieve the port number from the environment variable
    let port = env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let address = format!("0.0.0.0:{}", port);

    let allowed_origin = env
        ::var("ALLOWED_ORIGIN")
        .unwrap_or_else(|_| "http://localhost:3000".to_string());

    let pool = pg_pool();

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .wrap(Logger::default())
            .wrap(
                Cors::default()
                    .allowed_origin(&allowed_origin)
                    .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
                    .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
                    .allowed_header(header::CONTENT_TYPE)
                    .max_age(3600)
                    .supports_credentials() // Allow the cookie auth.
            )
            .service(web::scope("/api").configure(api::post::api_config))
    })
        .bind(&address)
        ? // Bind to the dynamically assigned port
        .run().await
}

fn logging_setup() {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
}

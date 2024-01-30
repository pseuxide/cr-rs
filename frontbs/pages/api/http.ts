export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}

export const http = <T>(path: string, method: string, body?: any, contentType: string = "application/json"): Promise<IHttpResponse<T>> => {

  const request = new Request(API_BASE_URL + path, {
    method: method,
    body: body ? JSON.stringify(body) : null
  });
  request.headers.set("Content-Type", contentType);
  // const token = localStorage.getItem("_token");
  // request.headers.set("Authorization", "Bearer " + token);

  return new Promise((resolve, reject) => {
    let response: IHttpResponse<T>;
    fetch(request)
    .then(res => {
      response = res;
      return res.json();
    })
    .then(body => {
      if (response.ok) {
        response.parsedBody = body;
        resolve(response);
      } else {
        console.error(`API Error: ${body["error"]}`);
        reject(body["error"]);
      }
    })
    .catch(err => {
      console.log(err);
      reject(err);
    });
  });
};

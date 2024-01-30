import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { http } from '../../api/http';
import { Loading } from '../../../components/loading';

interface PostsResponse {
  post: Post
}

interface Post {
  id:      number,
	title:   string,
  body:    string,
  created: string,
  updated: string,
}

const Edit: NextPage = () => {
  const router = useRouter()

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [post, setPost] = useState<Post>({} as Post);

  const [state, setState] = useState<Post>({
    id: 0,
    title: "",
    body: "",
    created: "",
    updated: "",
  });

  const handleChange = async (event: any) => {
    if (event.target.type === "number") {
      setState({ ...state, [event.target.name]: Number(event.target.value) });
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const id = router.query.id;
        if (!id) {
          return;
        }
        setLoading(true);
        const response = await http<PostsResponse>(`/posts/${id}`, "GET");
        const body = response.parsedBody
        if (!body) {
          setError('response error')
          return
        }
        setPost(body.post);
        setState(body.post);
      } catch (err: any) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  },[router]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const id = router.query.id;
      if (!id) {
        return;
      }
    const response = await http<PostsResponse>(`/posts/${id}`, "PUT", {
        title:   state.title,
        body:    state.body,
      });
      const resBody = response.parsedBody
      if (!resBody) {
        setError('response error')
        return
      }
      router.push('/posts');
    } catch (err: any) {
      setError(err.toString());
    }
  }

  const onDelete = async () => {
    try {
      const id = router.query.id;
      if (!id) {
        return;
      }
      const response = await http<PostsResponse>(`/posts/${id}`, "DELETE", {});
      const resBody = response.parsedBody
      if (!resBody) {
        setError('response error')
        return
      }
      router.push('/posts');
    } catch (err: any) {
      setError(err.toString());
    }
  }

  return (
    <div>
      <Head>
        <title>Post Edit</title>
        <meta name="description" content="Post Edit" />
      </Head>

      <h2>Posts</h2>
      <div>{error}</div>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <td><input type="text" name="title" defaultValue={post.title} onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Body</th>
              <td><textarea name="body" defaultValue={post.body} onChange={handleChange} /></td>
            </tr>
          </tbody>
        </table>
        <div className='v1'></div>
        <Link href={`/posts/${router.query.id}`}>Cancel</Link>
        <span className='h1'>|</span>
        <button type="submit">Update</button>
        <span className='h1'>|</span>
        <button onClick={onDelete}>Delete</button>
      </form>
      <Loading loading={loading} />
    </div>
  )
}

export default Edit;

// export const getStaticProps = async () =>{
//   return {
//     props:{}
//   }
// }

// export const getStaticPaths = async () => {
//   return {
//     paths: [
//       { params: { id: "0" } }
//     ],
//     fallback: true
//   };
// }

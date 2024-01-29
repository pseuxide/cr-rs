import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { http } from '../api/http';

interface PostsResponse {
  posts: Post[]
}

interface Post {
  id:      number,
	title:   string,
  body:    string,
  created: string,
  updated: string,
}

const New: NextPage = () => {
  const router = useRouter()

  const [error, setError] = useState<string>("");

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await http<PostsResponse>(`/posts/new`, "POST", {
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

  return (
    <div>
      <Head>
        <title>Post New</title>
        <meta name="description" content="Post New" />
      </Head>

      <h2>Posts</h2>
      <div>{error}</div>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <td><input type="text" name="title" defaultValue={""} onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Body</th>
              <td><textarea name="body" onChange={handleChange} /></td>
            </tr>
          </tbody>
        </table>
        <div className='v1'></div>
        <Link href={`/posts`}>Cancel</Link>
        <span className='h1'>|</span> 
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default New;

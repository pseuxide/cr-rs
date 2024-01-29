import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { http } from '../api/http';
import { Loading } from '../../components/loading';

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

const Index: NextPage = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const response = await http<PostsResponse>(`/posts`, "GET");
        const body = response.parsedBody
        if (!body) {
          setError('response error')
          return
        }
        setPosts(body.posts);
      } catch (err: any) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  },[]);

  return (
    <div>
      <Head>
        <title>Post List</title>
        <meta name="description" content="Post List" />
      </Head>

      <h2>Posts</h2>
      <div>{error}</div>
      <Link href={`/posts/new`}>New Post</Link>
      <div>
        {posts.map((post, index) => (
          <div key={index} className="post">
            <h4>{post.title}</h4>
            <div>
              {post.body}
            </div>
            <div className="v1">
              {post.created}
            </div>
            <div className="v1"></div>
            <Link href={`/posts/${post.id}`}>Show</Link>
          </div>
        ))}
      </div>
      <Loading loading={loading} />
    </div>
  )
}

export default Index;

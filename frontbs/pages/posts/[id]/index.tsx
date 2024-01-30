import { GetStaticProps, GetStaticPaths, GetServerSideProps  } from 'next';
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

const Index = (props: Props) => {
  const router = useRouter();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const post = props.post;

  // const [post, setPost] = useState<Post>({} as Post);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       setLoading(true);
  //       const id = router.query.id as string;
  //       if (!id) {
  //         return
  //       }
  //       const response = await http<PostsResponse>(`/posts/${id}`, "GET");
  //       console.log(response);
  //       const body = response.parsedBody
  //       if (!body) {
  //         setError('response error')
  //         return
  //       }
  //       setPost(body.post);
  //     } catch (err: any) {
  //       setError(err.toString());
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getPosts();
  // },[router]);

  return (
    <div>
      <Head>
        <title>{`Post Show - ${post.title}`}</title>
        <meta name="description" content="Post Show" />
      </Head>

      <h2>Posts</h2>
      <div>{error}</div>
      <table>
          <tbody>
            <tr>
              <th>Title</th>
              <td>{post.title}</td>
            </tr>
            <tr>
              <th>Body</th>
              <td>{post.body}</td>
            </tr>
            <tr>
              <th>Created</th>
              <td>{post.created}</td>
            </tr>
            <tr>
              <th>Updated</th>
              <td>{post.updated}</td>
            </tr>
          </tbody>
        </table>
      <div className='v1'></div>
      <Link href={`/posts`}>Back</Link>
      <span className='h1'>|</span>
      <Link href={`/posts/${post.id}/edit`}>Edit</Link>
      <Loading loading={loading} />
    </div>
  )
}

export default Index;

type Props = {
  post: Post
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id;
  // Fetch data from external API
  const response = await http<PostsResponse>(`/posts/${id}`, "GET");
  const body = response.parsedBody;
  // const response = await fetch(`http://localhost:3000/api/posts`);
  // const body = await response.json();
  const props: Props = {
    post: body?.post?? {} as Post,
  }
  // if (!body) {
  //   return {
  //     props:{
  //       post: {}
  //     }
  //   }
  // } else {
  //   console.log(body?.post)
  //   return {
  //     props:{
  //       post: body?.post
  //     }
  //   }
  // }
  return {
    props: props
  }
}

// export const getStaticProps: GetStaticProps = async ({params}) =>{
//   console.log(params)
//   const id = params?.id as string;
//   if (!id) {
//     return {
//       props:{
//         post: {}
//       }
//     }
//   }

//   const response = await http<PostsResponse>(`/posts/${id}`, "GET");
//   const body = response.parsedBody
//   if (!body) {
//     return {
//       props:{
//         post: {}
//       }
//     }
//   } else {
//     console.log(body?.post)
//     return {
//       props:{
//         post: body?.post
//       },
//       revalidate: 100
//     }
//   }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   // const router = useRouter()
//   // const id = router.query.id as string;
//   // console.log(id);

//   return {
//     paths: [],
//     fallback: "blocking"
//   };
// }

// Show.getInitialProps = async (ctx: any) => {
//   const id = ctx.query.id;
//   // Fetch data from external API
//   const response = await http<PostsResponse>(`/posts/${id}`, "GET");
//   const body = response.parsedBody
//   if (!body) {
//     return {
//       post: {}
//     }
//   } else {
//     console.log(body?.post)
//     return {
//       post: body?.post
//     }
//   }
// }

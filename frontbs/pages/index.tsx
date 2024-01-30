import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>crud-rust</title>
        <meta name="description" content="R(K)aishi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>Home</h2>
      <Link href="/posts">
        posts
      </Link>
      
    </div>
  )
}

export default Home

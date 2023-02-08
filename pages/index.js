import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { GraphQLClient, gql } from 'graphql-request';
import BlogCard from '../components/BlogCard'

const inter = Inter({ subsets: ['latin'] });
const graphcms = new GraphQLClient('https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cldq32m0r2fzp01uo3t3uex6d/master');

const QUERY = gql`
{
  posts{
    id,
    title,
    datePublished,
    slug,
    content{
      html
    }
    author{
      name
      avatar{
        url
      }
    }
    coverPhoto{
      url
    }
  }
}
`;

export async function getStaticProps(){
  const {posts} = await graphcms.request(QUERY);
  return{
    props:{
      posts,
    },
    revalidate:10,
  };
}

export default function Home({posts}) {
  return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name='description' content='ds;lkfja'/>
          <link rel='icon' href='/favicon.ico'/>
        </Head>

        <main className={styles.main}>
          {posts.map((post) => (
            <BlogCard title={post.title}
              author={post.author}
              coverPhoto={post.coverPhoto}
              key={post.id}
              datePublished={post.datePublished}
              slug={post.slug}
            />
          ))}
        </main>

      </div>  
      
  )
}

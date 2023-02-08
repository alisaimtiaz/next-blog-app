
import { Inter } from '@next/font/google';
import styles from '@/styles/Slug.module.css';
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
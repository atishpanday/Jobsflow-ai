import React from 'react'
import Head from 'next/head';
import BlogItem from '../components/blogItem';
import { PostType, getPosts } from '@/lib/posts';

export default async function Blogs() {

  const posts = await getPosts();

  return (
    <div>
      <Head>
        <title>Blogs</title>
        <meta name="description" content="A list of blogs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-fit-content max-w-6xl mx-auto my-8 px-2 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-customblack uppercase">Blog List</h1>
      </div>
      <div className="w-full flex flex-col space-y-8 my-8">
        {posts.map((blog: PostType) => (
          <BlogItem key={blog.id} id={blog.id} username={blog.username} title={blog.title} date={blog.date} description={blog.description} slug={blog.slug} body={blog.body} />
        ))}
      </div>
    </div>
  );
}
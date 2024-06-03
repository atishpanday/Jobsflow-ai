import React from 'react'
import { getPost } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import customComponents from "../customComponents";

export default async function Blog({ params }: { params: { slug: string } }) {

  const post = await getPost(params.slug);
  if (!post) {
    return notFound;
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="prose max-w-6xl mx-auto space-y-4 py-8">
        <MDXRemote components={customComponents} source={post.body} />
      </div>
    </div>
  )
}

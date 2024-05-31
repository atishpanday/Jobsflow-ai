import { getPost } from '@/lib/posts'
import { MDXProvider } from '@mdx-js/react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function Blog({ params }: { params: { slug: string } }) {

  const post = await getPost(params.slug);
  if (!post) {
    return notFound;
  }
  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="prose max-w-6xl mx-auto space-y-4">
        <MDXRemote source={post.body} />
      </div>
    </div>
  )
}

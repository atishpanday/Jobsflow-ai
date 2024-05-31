"use client"
import { PostType } from '@/lib/posts';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BlogItem({ id, username, title, date, description, slug, body }: PostType) {
  const router = useRouter();
  const gotoBlog = () => {
    router.push(`blogs/${slug}`);
  };

  return (
    <div
      key={id}
      className="p-6 w-full max-w-6xl mx-auto bg-white rounded-xl shadow-even space-y-4 cursor-pointer hover:bg-gray-100"
      onClick={() => gotoBlog()}>
      <p className="text-gray-500">{username}</p>
      <h1 className="text-xl uppercase font-bold bg-blue-green-gradient inline-block text-transparent bg-clip-text">{title}</h1>
      <p className="text-gray-500">{`Date posted: ${date}`}</p>
      <p className="text-black-500">{description}</p>
    </div>
  );
}

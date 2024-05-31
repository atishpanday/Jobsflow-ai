"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const CreateBlogButton = () => {
  const router = useRouter();
  const gotoCreateBlog = () => {
    router.push("/blogs/create");
  };

  return (
    <button className="px-4 py-4 border border-customblue text-lg text-customblue font-semibold rounded-md hover:bg-gray-100" onClick={() => gotoCreateBlog()}>
      Create your own blog!
    </button>
  );
};

export default CreateBlogButton;
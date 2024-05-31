"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreateBlog = () => {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { username, title, description, content };

    const response = await fetch('/api/save-blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Blog post saved successfully!');
      setUsername('');
      setTitle('');
      setDescription('');
      setContent('');
    } else {
      alert('Failed to save blog post');
    }
  };

  const router = useRouter();
  const backtoBlogs = () => {
    router.push("/blogs");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto my-8 p-6 bg-white rounded-lg shadow-even space-y-4">
      <h1 className="text-center text-4xl font-bold text-customblack uppercase">Create your own blog!</h1>
      <div>
        <label htmlFor="username" className="block text-lg font-bold text-gray-500">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md shadow-sm text-lg p-2 focus:outline-customblue"
          required
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-lg font-bold text-gray-500">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md shadow-sm text-lg p-2 focus:outline-customblue"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-lg font-bold text-gray-500">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md shadow-sm text-lg p-2 focus:outline-customblue"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-lg font-bold text-gray-500">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md shadow-sm text-lg p-2 h-64 focus:outline-customblue"
          required
        />
      </div>
      <div>
        <label className="block text-lg font-bold text-gray-500">Select an image for your blog</label>
        <label className="mt-1 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
              <path stroke="currentColor" d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
      <button
        type="submit"
        className="w-full py-2 shadow-sm text-lg font-medium rounded-md text-white bg-blue-green-gradient"
      >
        Publish
      </button>
      <button
        className="w-full py-2 shadow-sm text-lg font-medium rounded-md text-customblue border border-customblue"
        onClick={() => backtoBlogs()}>
        Back to blogs
      </button>
    </form>
  );
};

export default CreateBlog;

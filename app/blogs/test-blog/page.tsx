import React, { ReactFragment } from "react";
// import Body from "../../../posts/blog.mdx";
import { MDXProvider } from "@mdx-js/react";
import { getPost } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import customComponents from "../customComponents";

const TestBlog = async () => {
  const post = await getPost("my-first-post");
  if (!post) {
    return notFound;
  }

  return (
    <MDXRemote components={customComponents} source={post.body} />
  );
};

export default TestBlog;
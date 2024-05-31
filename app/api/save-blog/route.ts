import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const POST = async (req: Request) => {
  const { username, title, description, content } = await req.json();

  const posts = await fs.readdir("./posts/");
  const id = posts.length + 1;
  const slug = `blog${id}`;

  const mdxContent = `---
id: ${id}
username: ${username}
title: ${title}
date: ${Date.now()}
slug: ${slug}
description: ${description}
---

${content}
`;
  const filePath = path.join("./posts", `${slug}.mdx`);

  console.log(filePath);

  fs.writeFile(filePath, mdxContent);

  return NextResponse.json({ status: 200, message: 'Blog post saved successfully' });
}

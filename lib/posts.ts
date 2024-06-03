import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type PostType = {
  id: number;
  username: string;
  title: string;
  slug: string;
  date: string;
  description: string;
  body: string;
};

export const getPosts = async () => {
  const posts = fs.readdirSync("./posts/");

  return Promise.all(
    posts
      .filter((file) => path.extname(file) === ".mdx")
      .map(async (file) => {
        const filePath = `./posts/${file}`;
        const fileContent = await fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);
        // const body = await serialize(content);

        return { ...data, body: content } as PostType;
      })
  );
}

export const getPost = async (slug: string) => {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface BlogType {
  id: string;
  title: string;
  body: string;
}
export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetchBlogs();
        const data = response?.data;
        console.log(data.data?.[0].attributes.data, "blogs=====");
        setBlogs(data.data?.[0].attributes.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getBlogs();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Blogs</h1>
      {blogs.length > 0 &&
        blogs.map((item: BlogType) => (
          <ul key={item.id}>
            <li>{item.title}</li>
            <li>{item.body}</li>
          </ul>
        ))}
    </main>
  );
}

async function fetchBlogs() {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
  };
  try {
    const format = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}api/blogs`,
      options
    );
    return format;
    console.log(format, "format");
  } catch (err) {
    console.log(err, "err");
  }
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "../../pages/Article";
import { POSTS, getPost } from "../../lib/posts";

/** The post list is a static array, so any slug outside it is a real 404 —
 *  no point generating it on demand. */
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found — Eigensu" };

  return {
    title: `${post.title} — Eigensu`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.iso,
      authors: [post.author],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return <ArticlePage post={post} />;
}

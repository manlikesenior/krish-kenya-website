import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatBlogDate, getPublishedBlogBySlug } from '@/lib/blogs';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: `${blog.title} | KRISH-KENYA`,
      description: blog.excerpt,
      type: 'article',
      images: blog.cover_image ? [{ url: blog.cover_image }] : undefined,
    },
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/blog"
          className="inline-flex text-sm uppercase tracking-[0.3em] text-gray-400 transition-colors hover:text-[#D4AF37]"
        >
          Back to Blog
        </Link>

        <header className="mt-6 sm:mt-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
            {formatBlogDate(blog.created_at)}
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-white">
            {blog.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base sm:text-lg leading-8 text-gray-400">
            {blog.excerpt}
          </p>
        </header>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden border border-white/10 bg-black">
          <Image
            src={blog.cover_image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div
          className="blog-content mt-10 sm:mt-12 text-gray-200"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}

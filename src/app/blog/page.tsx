import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPublishedBlogs, formatBlogDate } from '@/lib/blogs';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest stories, updates, and artist journal entries from KRISH-KENYA.',
  openGraph: {
    title: 'Blog | KRISH-KENYA',
    description: 'Read the latest stories, updates, and artist journal entries from KRISH-KENYA.',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 sm:mb-14">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-3 sm:mb-4 border-l-4 border-[#D4AF37] pl-4 sm:pl-6">
            BLOG
          </h1>
          <p className="text-gray-400 text-base sm:text-lg pl-4 sm:pl-6 max-w-3xl">
            Stay updated with the latest news and insights from KRISH-KENYA.
          </p>
        </div>

        {blogs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group overflow-hidden border border-white/10 bg-[#111] transition-colors hover:border-[#D4AF37]/50"
              >
                <Link href={`/blog/${blog.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    <Image
                      src={blog.cover_image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-4 p-5 sm:p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                      {formatBlogDate(blog.created_at)}
                    </p>
                    <h2 className="font-display text-3xl text-white">
                      {blog.title}
                    </h2>
                    <p className="text-sm leading-7 text-gray-400">
                      {blog.excerpt}
                    </p>
                    <span className="inline-flex text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors group-hover:text-[#D4AF37]">
                      Read Post
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-white/15 bg-[#111] px-6 py-16 text-center text-gray-400">
            No published blog posts yet.
          </div>
        )}
      </div>
    </div>
  );
}

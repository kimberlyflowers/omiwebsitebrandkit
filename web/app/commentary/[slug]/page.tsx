import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PortableBody from "@/components/PortableBody";
import ImageSlot from "@/components/ImageSlot";
import { fetchPostBySlug, fetchPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) return { title: "Post not found — OMI" };
  return {
    title: `${post.title} — OMI Commentary`,
    description: post.excerpt,
  };
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch { return ""; }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) notFound();

  const coverUrl =
    post.mainImage ? urlFor(post.mainImage)?.width(2000).height(1200).fit("crop").auto("format").url() : null;

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative bg-celestial grain pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-deep" />
          <div className="relative mx-auto max-w-3xl px-6 md:px-10 text-center">
            <Link href="/commentary" className="text-xs uppercase tracking-[0.2em] font-display font-semibold text-mist/70 hover:text-white transition-colors">
              ← All commentary
            </Link>
            {post.categories?.[0] && (
              <div className="mt-6 inline-block px-3 py-1 rounded-full bg-gold-heritage/15 border border-gold-heritage/30 text-[11px] uppercase tracking-[0.2em] font-display font-semibold text-gold-heritage">
                {post.categories[0].title}
              </div>
            )}
            <h1 className="mt-5 font-display font-black text-white text-4xl md:text-6xl leading-[1.05] tracking-tight">
              {post.title}
            </h1>
            {post.excerpt && <p className="mt-6 text-lg md:text-xl text-mist/85 leading-relaxed">{post.excerpt}</p>}
            <div className="mt-7 text-sm text-mist/70 font-display">
              {post.author?.name && <span>{post.author.name} · </span>}
              {formatDate(post.publishedAt)}
            </div>
          </div>
        </section>

        {/* Cover */}
        {coverUrl ? (
          <div className="bg-indigo-deep -mt-12">
            <div className="mx-auto max-w-container px-6 md:px-10">
              <img src={coverUrl} alt="" className="w-full aspect-[21/9] object-cover rounded-lg shadow-omi-lg" />
            </div>
          </div>
        ) : (
          <div className="bg-indigo-deep -mt-12">
            <div className="mx-auto max-w-container px-6 md:px-10">
              <ImageSlot ratio="aspect-[21/9]" tone="dark" caption="Post cover image" id={`commentary-${params.slug}-cover`} />
            </div>
          </div>
        )}

        {/* Body */}
        <section className="relative bg-offwhite text-indigo-deep">
          <div className="absolute top-[200px] inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />
          <article className="mx-auto max-w-2xl px-6 py-20 md:py-28">
            <PortableBody value={post.body} />
          </article>
        </section>

        {/* Author card + outro */}
        {post.author?.name && (
          <section className="bg-offwhite pb-20">
            <div className="mx-auto max-w-2xl px-6">
              <div className="rounded-lg bg-white border border-mist shadow-omi-sm p-6 md:p-8 flex gap-5 items-start">
                {post.author.image ? (
                  <img
                    src={urlFor(post.author.image)?.width(160).height(160).fit("crop").auto("format").url() ?? ""}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-heritage to-gold-bright shrink-0" />
                )}
                <div>
                  <div className="text-xs uppercase tracking-wider font-display font-semibold text-gold-heritage mb-1">Written by</div>
                  <div className="font-display font-bold text-indigo-deep text-lg">{post.author.name}</div>
                  {post.author.role && <div className="text-sm text-graphite/70">{post.author.role}</div>}
                  {post.author.bio && <p className="mt-2 text-sm text-graphite leading-relaxed">{post.author.bio}</p>}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Back to feed */}
        <section className="bg-indigo-deep py-14">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <Link href="/commentary" className="btn btn-ghost">
              ← More commentary
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

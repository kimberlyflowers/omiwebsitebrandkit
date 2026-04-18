import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ImageSlot from "@/components/ImageSlot";
import { fetchPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";

export const metadata = {
  title: "Commentary — Outpouring Missions International",
  description: "Thoughtful, Spirit-led reflection on the questions shaping our culture.",
};

export const revalidate = 60; // ISR — refetch at most once/minute

type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: unknown;
  publishedAt: string;
  featured?: boolean;
  author?: { name?: string };
  categories?: { title: string; slug: string }[];
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return "";
  }
}

export default async function CommentaryIndex() {
  const posts: PostSummary[] = await fetchPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p._id !== featured?._id);

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative bg-celestial grain pt-36 pb-16 md:pt-44 md:pb-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-deep" />
          <div className="relative mx-auto max-w-container px-6 md:px-10">
            <div className="eyebrow flex items-center gap-3 mb-5 text-gold-heritage">
              <span className="w-8 h-px bg-gold-heritage" />
              Commentary
            </div>
            <h1 className="font-display font-black text-white text-5xl md:text-7xl leading-[1.05] tracking-tight max-w-3xl">
              Thoughtful reflection on the moment.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-mist/85 leading-relaxed max-w-2xl">
              A teaching ministry, not a news feed. Scripture-anchored, posture-aware commentary on the questions shaping our culture.
            </p>
          </div>
        </section>

        {/* Feed */}
        <section className="relative bg-offwhite text-indigo-deep py-16 md:py-24">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />

          <div className="mx-auto max-w-container px-6 md:px-10">
            {!isSanityConfigured && (
              <div className="mb-10 rounded-lg border-2 border-dashed border-gold-heritage/40 bg-gold-heritage/5 p-6 text-sm text-graphite">
                <div className="font-display font-semibold text-indigo-deep mb-1">Sanity not configured yet</div>
                Add <code className="px-1.5 py-0.5 bg-mist/50 rounded text-xs">NEXT_PUBLIC_SANITY_PROJECT_ID</code> to Vercel env vars and publish your first post at <code className="px-1.5 py-0.5 bg-mist/50 rounded text-xs">/studio</code>. Posts will appear here automatically.
              </div>
            )}

            {posts.length === 0 && isSanityConfigured && (
              <div className="py-20 text-center">
                <div className="eyebrow text-gold-heritage mb-3">Coming soon</div>
                <p className="text-graphite max-w-md mx-auto">
                  The first commentary pieces are in the queue. Check back shortly — or visit{" "}
                  <Link href="/studio" className="text-teal-mission underline hover:text-gold-heritage">
                    /studio
                  </Link>{" "}
                  to publish one.
                </p>
              </div>
            )}

            {/* Featured */}
            {featured && (
              <Link
                href={`/commentary/${featured.slug}`}
                className="group block rounded-lg bg-white border border-mist shadow-omi-sm hover:shadow-omi-lg hover:border-gold-heritage/40 transition-all duration-500 overflow-hidden mb-12"
              >
                <div className="grid md:grid-cols-[1.2fr_1fr] gap-0">
                  <div className="aspect-[16/10] md:aspect-auto">
                    {featured.mainImage ? (
                      <img
                        src={urlFor(featured.mainImage as object)?.width(1200).height(800).fit("crop").auto("format").url() ?? ""}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageSlot
                        ratio="aspect-[16/10] md:aspect-auto md:h-full"
                        tone="light"
                        caption="Featured post cover"
                        id={`commentary-featured-${featured.slug}`}
                      />
                    )}
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="eyebrow text-gold-heritage mb-3">Featured</div>
                    <h2 className="font-display font-black text-indigo-deep text-3xl md:text-4xl leading-tight mb-4">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-graphite/80 leading-relaxed mb-5">{featured.excerpt}</p>
                    )}
                    <div className="text-xs text-graphite/60 font-display">
                      {featured.author?.name && <span>{featured.author.name} · </span>}
                      {formatDate(featured.publishedAt)}
                    </div>
                    <div className="mt-6 font-display font-semibold text-gold-heritage group-hover:translate-x-1 transition-transform">
                      Read →
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <Link
                    key={post._id}
                    href={`/commentary/${post.slug}`}
                    className="group block rounded-lg bg-white border border-mist shadow-omi-sm hover:shadow-omi-lg hover:border-gold-heritage/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                  >
                    {post.mainImage ? (
                      <img
                        src={urlFor(post.mainImage as object)?.width(800).height(500).fit("crop").auto("format").url() ?? ""}
                        alt=""
                        className="w-full aspect-[16/10] object-cover"
                      />
                    ) : (
                      <ImageSlot
                        ratio="aspect-[16/10]"
                        tone="light"
                        caption="Post cover"
                        id={`commentary-${post.slug}`}
                      />
                    )}
                    <div className="p-6">
                      {post.categories?.[0] && (
                        <div className="eyebrow text-teal-mission mb-2">{post.categories[0].title}</div>
                      )}
                      <h3 className="font-display font-bold text-indigo-deep text-xl leading-tight mb-3">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-graphite/80 leading-relaxed line-clamp-3">{post.excerpt}</p>
                      )}
                      <div className="mt-4 text-xs text-graphite/60 font-display">
                        {post.author?.name && <span>{post.author.name} · </span>}
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

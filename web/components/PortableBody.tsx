"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-lg leading-[1.75] text-graphite mb-5">{children}</p>,
    h2: ({ children }) => (
      <h2 className="font-display font-bold text-indigo-deep text-3xl md:text-4xl mt-12 mb-5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-bold text-indigo-deep text-2xl mt-10 mb-4 leading-tight">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-4 border-gold-heritage pl-6 md:pl-8 py-2">
        <p className="font-display font-semibold text-2xl md:text-3xl leading-tight text-indigo-deep italic">
          {children}
        </p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-indigo-deep">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const newTab = value?.newTab;
      return (
        <a
          href={href}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          className="text-teal-mission underline underline-offset-2 hover:text-gold-heritage transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const url = urlFor(value)?.width(1600).fit("max").auto("format").url();
      if (!url) return null;
      return (
        <figure className="my-12 -mx-6 md:-mx-16">
          <img src={url} alt={value?.alt ?? ""} className="w-full rounded-lg" />
          {value?.caption && (
            <figcaption className="mt-3 text-xs text-graphite/60 font-display italic text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PortableBody({ value }: { value: unknown }) {
  if (!value) return null;
  return <PortableText value={value as never} components={components} />;
}

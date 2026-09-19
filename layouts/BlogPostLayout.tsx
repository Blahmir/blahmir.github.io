import type { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import siteMetadata from '@/data/siteMetadata';

type EntryReference = { id: number; title: string } | null;

type BlogPostLayoutProps = {
  frontMatter: {
    id?: number;
    title: string;
    date: string;
    summary?: string;
  };
  previous: EntryReference;
  next: EntryReference;
  backHref?: string;
  backLabel?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  children: ReactNode;
};

export default function BlogPostLayout({
  frontMatter,
  previous,
  next,
  backHref = '/thoughts',
  backLabel = '← Thoughts',
  canonicalPath,
  noIndex = false,
  children,
}: BlogPostLayoutProps) {
  const description = frontMatter.summary || siteMetadata.description;
  const canonicalUrl = `${siteMetadata.siteUrl}${canonicalPath || `thoughts/${frontMatter.id}`}`;

  return (
    <>
      <Head>
        <title>{frontMatter.title} · {siteMetadata.author}</title>
        <meta name="description" content={description} />
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
      </Head>
      <main className="article-shell">
        <Link href={backHref} className="back-link">{backLabel}</Link>
        <article>
          <header className="article-header">
            <time dateTime={frontMatter.date}>
              {new Intl.DateTimeFormat('en-CA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC',
              }).format(new Date(frontMatter.date))}
            </time>
            <h1>{frontMatter.title}</h1>
            {frontMatter.summary && <p>{frontMatter.summary}</p>}
          </header>
          <div className="prose">{children}</div>
        </article>
        {(previous || next) && (
          <nav className="entry-navigation" aria-label="Adjacent entries">
            {previous ? <Link href={`/thoughts/${previous.id}`}>← {previous.title}</Link> : <span />}
            {next ? <Link href={`/thoughts/${next.id}`}>{next.title} →</Link> : <span />}
          </nav>
        )}
      </main>
    </>
  );
}

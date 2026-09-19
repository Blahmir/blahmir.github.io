import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import siteMetadata from '@/data/siteMetadata';
import { getNumberedEntries, type NumberedEntry } from '@/lib/content';

type ThoughtsProps = {
  entries: NumberedEntry[];
};

export const getStaticProps: GetStaticProps<ThoughtsProps> = async () => ({
  props: { entries: await getNumberedEntries() },
});

export default function Thoughts({ entries }: ThoughtsProps) {
  return (
    <>
      <Head>
        <title>Thoughts · {siteMetadata.author}</title>
        <meta name="description" content="Notes and writing by Amir Abdurazak." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="content-shell">
        <Link href="/" className="back-link">← Home</Link>
        <header className="page-header">
          <p className="eyebrow">Notes and ideas</p>
          <h1>Thoughts</h1>
          <p>Occasional entries about software, ideas, and things worth remembering.</p>
        </header>

        <ol className="entry-list">
          {entries.map((entry) => (
            <li key={`${entry.source}-${entry.slug}`}>
              <Link href={`/thoughts/${entry.id}`} className="entry-row">
                <time dateTime={entry.date}>
                  {new Intl.DateTimeFormat('en-CA', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    timeZone: 'UTC',
                  }).format(new Date(entry.date))}
                </time>
                <span>
                  <strong>{entry.title}</strong>
                  {entry.summary && <small>{entry.summary}</small>}
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}

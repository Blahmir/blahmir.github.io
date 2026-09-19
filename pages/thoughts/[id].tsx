import type { GetStaticPaths, GetStaticProps } from 'next';
import { MDXLayoutRenderer } from '@/components/MDXComponents';
import { getNumberedEntries, type NumberedEntry } from '@/lib/content';
import { getFileBySlug } from '@/lib/mdx';

type ThoughtEntryProps = {
  post: {
    mdxSource: string;
    toc: unknown[];
    frontMatter: Record<string, unknown>;
  };
  entry: NumberedEntry;
  previous: Pick<NumberedEntry, 'id' | 'title'> | null;
  next: Pick<NumberedEntry, 'id' | 'title'> | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getNumberedEntries();
  return {
    paths: entries.map((entry) => ({ params: { id: String(entry.id) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ThoughtEntryProps> = async ({ params }) => {
  const entries = await getNumberedEntries();
  const id = Number(params?.id);
  const index = entries.findIndex((entry) => entry.id === id);

  if (index < 0) return { notFound: true };

  const entry = entries[index];
  const post = await getFileBySlug(entry.source, entry.slug);
  const toReference = (item: NumberedEntry | undefined) =>
    item ? { id: item.id, title: item.title } : null;

  return {
    props: {
      post,
      entry,
      previous: toReference(entries[index + 1]),
      next: toReference(entries[index - 1]),
    },
  };
};

export default function ThoughtEntry({ post, entry, previous, next }: ThoughtEntryProps) {
  return (
    <MDXLayoutRenderer
      layout="BlogPostLayout"
      toc={post.toc}
      mdxSource={post.mdxSource}
      frontMatter={{ ...post.frontMatter, id: entry.id }}
      previous={previous}
      next={next}
      noIndex
    />
  );
}

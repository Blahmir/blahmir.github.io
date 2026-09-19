import { getAllFilesFrontMatter } from './mdx';

export type ContentSource = 'blog' | 'journal';

export type NumberedEntry = {
  id: number;
  source: ContentSource;
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags: string[];
};

type FrontMatter = Omit<NumberedEntry, 'id' | 'source'>;

export async function getNumberedEntries(): Promise<NumberedEntry[]> {
  const [blogEntries, journalEntries] = await Promise.all([
    getAllFilesFrontMatter('blog'),
    getAllFilesFrontMatter('journal'),
  ]);

  return [
    ...blogEntries
      .filter((entry: FrontMatter) => !entry.tags?.includes('Projects'))
      .map((entry: FrontMatter) => ({ ...entry, source: 'blog' as const })),
    ...journalEntries.map((entry: FrontMatter) => ({ ...entry, source: 'journal' as const })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((entry, index) => ({ ...entry, tags: entry.tags || [], id: index + 1 }));
}

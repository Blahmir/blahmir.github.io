import type { GetStaticPaths, GetStaticProps } from 'next';
import { MDXLayoutRenderer } from '@/components/MDXComponents';
import projectsData from '@/data/projectsData';
import { getFileBySlug } from '@/lib/mdx';

type ProjectDetailProps = {
  post: {
    mdxSource: string;
    toc: unknown[];
    frontMatter: Record<string, unknown>;
  };
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projectsData.map((project) => ({
    params: { slug: project.postSlug.split('/').at(-1) },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<ProjectDetailProps> = async ({ params }) => {
  const slug = String(params?.slug);
  const project = projectsData.find((item) => item.postSlug.split('/').at(-1) === slug);

  if (!project) return { notFound: true };

  return {
    props: {
      post: await getFileBySlug('blog', project.postSlug),
      slug,
    },
  };
};

export default function ProjectDetail({ post, slug }: ProjectDetailProps) {
  return (
    <MDXLayoutRenderer
      layout="BlogPostLayout"
      toc={post.toc}
      mdxSource={post.mdxSource}
      frontMatter={post.frontMatter}
      previous={null}
      next={null}
      backHref="/projects"
      backLabel="← Projects"
      canonicalPath={`projects/${slug}`}
    />
  );
}

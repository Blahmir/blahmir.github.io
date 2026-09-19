import { useMemo, type ComponentProps } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Image from 'next/image';
import Link from 'next/link';
import BlogPostLayout from '@/layouts/BlogPostLayout';

const SmartLink = ({ href = '', ...props }: ComponentProps<'a'>) => {
  if (href.startsWith('/')) return <Link href={href} {...props} />;
  if (href.startsWith('#')) return <a href={href} {...props} />;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
};

const MDXComponents = {
  Image,
  a: SmartLink,
  wrapper: ({ layout: _layout, ...props }: Record<string, unknown>) => (
    <BlogPostLayout {...(props as unknown as ComponentProps<typeof BlogPostLayout>)} />
  ),
};

type MDXLayoutRendererProps = {
  layout: string;
  mdxSource: string;
  [key: string]: unknown;
};

export function MDXLayoutRenderer({ layout, mdxSource, ...rest }: MDXLayoutRendererProps) {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);
  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />;
}

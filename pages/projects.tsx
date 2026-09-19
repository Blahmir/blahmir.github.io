import Head from 'next/head';
import Link from 'next/link';
import projectsData from '@/data/projectsData';
import siteMetadata from '@/data/siteMetadata';

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects · {siteMetadata.author}</title>
        <meta
          name="description"
          content="Selected software projects by Amir Abdurazak."
        />
      </Head>
      <main className="content-shell">
        <Link href="/" className="back-link">← Home</Link>
        <header className="page-header">
          <p className="eyebrow">Selected work</p>
          <h1>Projects</h1>
          <p>A compact collection of things I have designed, built, and learned from.</p>
        </header>

        <ol className="project-list">
          {projectsData.map((project, index) => (
            <li key={project.title}>
              <Link href={`/projects/${project.postSlug.split('/').at(-1)}`} className="project-row">
                <span className="project-index">0{index + 1}</span>
                <span className="project-copy">
                  <strong>{project.title}</strong>
                  <span>{project.description}</span>
                  <small>{project.technologies.join(' · ')}</small>
                </span>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}

import Head from 'next/head';
import Link from 'next/link';
import siteMetadata from '@/data/siteMetadata';

const links = [
  {
    label: 'LinkedIn',
    detail: 'Professional profile',
    href: 'https://www.linkedin.com/in/amirabdurazak/',
    external: true,
  },
  {
    label: 'GitHub',
    detail: 'Code and experiments',
    href: 'https://github.com/Blahmir',
    external: true,
  },
  {
    label: 'Email',
    detail: 'Start a conversation',
    href: 'mailto:amir@amirabdurazak.ca',
    external: false,
  },
  {
    label: 'Projects',
    detail: 'Selected work',
    href: '/projects',
    external: false,
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
      </Head>
      <main className="home-shell">
        <div className="ambient" aria-hidden="true">
          <span className="ambient-shape ambient-shape-one" />
          <span className="ambient-shape ambient-shape-two" />
          <span className="ambient-shape ambient-shape-three" />
          <span className="ambient-grid" />
        </div>

        <section className="hero-card" aria-labelledby="home-title">
          <h1 id="home-title">
            <span>Amir Abdurazak</span>
            <span className="role">Software Engineer</span>
          </h1>
          <p className="intro">
            I build thoughtful, reliable software and enjoy turning complex ideas into useful,
            well-crafted experiences. This is a small index of my work and the best ways to find me
            online.
          </p>

          <nav className="link-grid" aria-label="Primary links">
            {links.map((item) => {
              const content = (
                <>
                  <span className="link-copy">
                    <span className="link-title">
                      <span className="link-arrow" aria-hidden="true">
                        ↗
                      </span>
                      <strong>{item.label}</strong>
                    </span>
                    <small>{item.detail}</small>
                  </span>
                </>
              );

              return item.href.startsWith('/') ? (
                <Link className="home-link" href={item.href} key={item.label}>
                  {content}
                </Link>
              ) : (
                <a
                  className="home-link"
                  href={item.href}
                  key={item.label}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                >
                  {content}
                </a>
              );
            })}
          </nav>
        </section>

        <footer className="home-footer">
          <span>© {new Date().getFullYear()} Amir Abdurazak</span>
        </footer>
      </main>
    </>
  );
}

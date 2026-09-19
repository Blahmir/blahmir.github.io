import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head><title>Page not found · Amir Abdurazak</title></Head>
      <main className="error-shell">
        <p className="eyebrow">404</p>
        <h1>This page drifted out of view.</h1>
        <p>The address may have changed during the site redesign.</p>
        <Link href="/" className="button-link">Return home</Link>
      </main>
    </>
  );
}

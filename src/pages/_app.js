import Head from 'next/head';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import '../scss/styles.scss';

function MyApp({ Component, pageProps }) {
  return (
    <div className='appShell'>
      <Head>
        <title>GitHub Repo Fetch</title>
        <meta
          name='description'
          content='Search GitHub repositories, filter by language and explore repository details and developers.'
        />
        <meta name='theme-color' content='#171A1F' />
        <link rel='icon' href='/brand/favicon.svg' type='image/svg+xml' />
        <link rel='icon' href='/brand/favicon-32.png' sizes='32x32' type='image/png' />
        <link rel='icon' href='/brand/favicon-16.png' sizes='16x16' type='image/png' />
        <link rel='apple-touch-icon' href='/brand/apple-touch-icon.png' sizes='180x180' />
        <link rel='manifest' href='/brand/site.webmanifest' />
        <meta property='og:title' content='GitHub Repo Fetch' />
        <meta property='og:description' content='Find repositories worth exploring.' />
        <meta property='og:image' content='/brand/social-preview.png' />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <Navbar />
      <main className='page'>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;

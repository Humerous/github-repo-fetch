import Navbar from '../components/NavBar';
import '../scss/styles.scss';
import Head from 'next/head';

//<--- INITIALIZE PAGE FUNCTIONS  --->
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Github Repository 🗂️</title>
      </Head>
      <Navbar></Navbar>
      <div className='page'>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

//<--- EXPORT FUNCTIONS --->
export default MyApp;

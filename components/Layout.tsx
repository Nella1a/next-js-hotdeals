import Head from 'next/head';

// import Footer from './Footer';

type Props = {
  children?: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <>
      <Head>
        {' '}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{props.children}</main>
    </>
  );
}

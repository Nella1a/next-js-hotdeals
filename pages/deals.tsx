import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { getUserByValidSessionToken } from '../util/database';
import { useState } from 'react';
import { sectionOneIndex } from '../components/elements';

export default function Home() {
  const [inputValue, setInputValue] = useState<number>(0);
  const [userFollowers, setUserFollowers] = useState();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await fetch(`/api/deals${inputValue}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ hotdeals: inputValue }), // ACHTUNG
    })
      .then((res) => res.json())
      .then((userData) => {
        setUserFollowers(userData);
        console.log('userData', userData);
      });
    console.log('userFollowers:,', userFollowers);
  };
  return (
    <Layout>
      <Head>
        <title>Get Deals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section css={sectionOneIndex}>
        <p>Update and Manage Deals</p>
      </section>
      <section>
        <h1>Fetch Deals</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="selectDeal">
            <span>Select Platform</span>
          </label>
          <select
            id="selectDeal"
            name="selectDeal"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
          >
            <option value="0">--pleae select---</option>
            <option value="1">moemax</option>
            <option value="2">moebelix</option>
            <option value="3">moemax</option>
            <option value="4">select all</option>
          </select>
          <button>Submit</button>
        </form>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Get current user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  // 2. Retrieve user by valid sessionToken
  const user = await getUserByValidSessionToken(token);
  // error handling: no session token
  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // success: valid token
  return {
    props: {
      user: user,
    },
  };
}

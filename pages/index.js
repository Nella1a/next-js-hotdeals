import Head from 'next/head';
import React from 'react';

export default function Home() {
  const [inputValue, setInputValue] = React.useState('');
  const [userFollowers, setUserFollowers] = React.useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/deals', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ TWuser: inputValue }),
    })
      .then((res) => res.json())
      .then((userData) => {
        setUserFollowers(userData);
      });
  };
  return (
    <div>
      <Head>
        <title>Get Deals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Fetch Deals</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="selectDeal">
            <span>Select Platform</span>
          </label>
          <select
            id="selectDeal"
            name="selectDeal"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          >
            <option value="0">--pleae select---</option>
            <option value="1">lutz</option>
            <option value="2">moebelix</option>
            <option value="3">moemax</option>
            <option value="4">select all</option>
          </select>
          {console.log('Selected Deal', inputValue)}
          <button>Submit</button>
        </form>
      </main>
    </div>
  );
}

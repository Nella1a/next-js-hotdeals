import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { getUserByValidSessionToken, Products } from '../util/database';
import { useState } from 'react';
import {
  sectionOneAdmin,
  sectionOneIndex,
  sectionTwoAdmin,
  sectionTwoAdminDashboard,
} from '../components/elements';

// type Products = {
//   name: string;
//   nameAndInfo: string;
//   productUrl: string;
//   oldPrice: string;
//   currentPrice: string;
//   savings: string;
//   category: number;
// };

export default function Home() {
  const [inputValue, setInputValue] = useState<number>(0);
  const [deals, setDeals] = useState<Products[]>([]);
  const [errors, setErrors] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  // if (deals !== []) {
  //   console.log('deals length:,', deals.length);
  // }

  // send deals to API
  const sendDealsToDB = async () => {
    console.log('Deals Send To DB:', deals);
    const dealsInDB = await fetch(`/api/saveInDB`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ hotdeals: deals }),
    });

    const dealsInDBResponseBody = await dealsInDB.json();
    console.log('ResponseBody:', dealsInDBResponseBody);

    // check response from api for errors
    if ('erros' in dealsInDBResponseBody) {
      setErrors(dealsInDBResponseBody.errors);
    }
    setErrors('');
    setDeals(dealsInDBResponseBody.deals);
    setApiResponse(dealsInDBResponseBody.message);
  };

  return (
    <Layout>
      <Head>
        <title>Admin Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section css={[sectionOneIndex, sectionOneAdmin]}>
        <p>Update And Manage Deals</p>
      </section>
      <section css={sectionTwoAdmin}>
        <div>
          <h1>Get new deals</h1>
          {/* Get new deals */}
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const getNewDeals = await fetch(`/api/deals${inputValue}`, {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify({ hotdeals: inputValue }),
              });

              const getNewDealsResponseBody = await getNewDeals.json();
              console.log('ResponseBody:', getNewDealsResponseBody);

              // check response from api for errors
              if ('erros' in getNewDealsResponseBody) {
                setErrors(getNewDealsResponseBody.errors);
              }
              setErrors('');
              setDeals(getNewDealsResponseBody.deals);
            }}
          >
            <label htmlFor="selectDeal">
              <span>Select Platform</span>
            </label>
            <div>
              <select
                id="selectDeal"
                name="selectDeal"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
              >
                <option value="0">--please select---</option>
                <option value="1">moemax</option>
                <option value="2">moebelix</option>
                <option value="3">xxlutz</option>
              </select>

              <button>Submit</button>
            </div>
          </form>
        </div>
        {/* send deals to db  */}
        <div>
          <p>{errors}</p>
          <p>{apiResponse}</p>
          <button onClick={sendDealsToDB}>Save Products in DB</button>
        </div>
      </section>
      <section css={sectionTwoAdminDashboard}>
        <article>
          <div>Product Name</div>
          <div>Category</div>
          <div>Old Price</div>
          <div>Current Price</div>
          <div>Discount</div>
        </article>

        {errors ? (
          <p>{errors}</p>
        ) : deals.length === 0 ? (
          <p>no new deals available</p>
        ) : (
          deals.map((deal) => {
            return (
              <article key={`deal${deal.name}${deal.priceOld}`}>
                <p>{deal.name}</p>
                <p>{deal.category}</p>
                <p>{deal.priceOld}</p>
                <p>{deal.priceCurrent}</p>
                <p>{deal.discount}</p>
              </article>
            );
          })
        )}
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

/* Admin area: Overview of all deals

*/

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {
  getUserByValidSessionToken,
  Products,
  readProducts,
} from '../util/database';

export default function Home(props: any) {
  const [inputValue, setInputValue] = useState<number>(0);
  const [deals, setDeals] = useState<Products[]>(props.deals);
  const [errors, setErrors] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [filterByCategory, setFilterByCategory] = useState(0);
  const [deleteDeal, setDeleteDeal] = useState(0);

  console.log('deals props', deals.length);
  // if (deals !== []) {
  //   console.log('deals length:,', deals.length);
  // }

  useEffect(() => {
    const sortArray = deals.sort(function (a: any, b: any) {
      return a.categoryId - b.categoryId;
    });

    setDeals(sortArray);
  }, [deals]);

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

  // delete item in DB

  const deleteItemInDB = async (deal: any) => {
    const deleteProduct = await fetch(`/api/deleteInDB`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ dealId: parseInt(deal) }),
    });
    const deleteProductResponseBody = await deleteProduct.json();

    if ('errors' in deleteProductResponseBody) {
      console.log(errors);
    }

    const newDeals = deals.filter(
      (event: any) => event.id !== deleteProductResponseBody.dealId,
    );
    setDeals(newDeals);
  };

  return (
    <Layout>
      <Head>
        <title>Admin Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <p>Update And Manage Deals</p>
      </section>
      <section>
        <div>
          <h1>Get new deals</h1>

          {/* FIRST FORM - Get new deals */}
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
        {/* SAVE DEALS IN DB */}
        <div>
          <p>{errors}</p>
          <p>{apiResponse}</p>
          {/* <button onClick={deletesProduct}>Save Products in DB</button> */}
          <button>Save Products in DB</button>

          {/* FILTER */}
          <div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const filterDeals = deals.filter((deal: any) => {
                  return deal.categoryId === filterByCategory;
                });
                console.log('Anzahl:', filterDeals.length);

                setDeals(filterDeals);
              }}
            >
              <label htmlFor="filter">Filter by category</label>
              <select
                id="filter"
                value={filterByCategory}
                onChange={(event) =>
                  setFilterByCategory(parseInt(event.currentTarget.value))
                }
              >
                <option value="0">--select--</option>
                <option value="1">Topseller</option>
                <option value="2">Wohnzimmer</option>
                <option value="3">Schlafzimmer</option>
              </select>
              <button>submit</button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <article>
          <div>Product Name</div>
          <div>Category</div>
          <div>Old Price</div>
          <div>Current Price</div>
          <div>Discount</div>
          <div>Id</div>
        </article>

        {deals.map((deal: any) => {
          return (
            <article key={`deal${deal.name}${deal.priceOld}`}>
              <p>{deal.productName}</p>
              <p>{deal.categoryId}</p>
              <p>{deal.priceOld}</p>
              <p>{deal.priceCurrent}</p>
              <p>{deal.discount}</p>
              <p>{deal.id}</p>
              {/* <label htmlFor="checkDelete"></label>
              <input id="checkDelete" type="checkbox" /> */}
              <button
                onClick={() => {
                  setDeleteDeal(deal.id);
                  deleteItemInDB(deal.id);
                }}
              >
                X
              </button>
            </article>
          );
        })}
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

  const readDealsInDB = await readProducts();

  const sortArray = readDealsInDB.sort(function (a: any, b: any) {
    if (a.productName < b.productName) {
      return -1;
    }
    if (a.productName > b.productName) {
      return 1;
    }
    return 0;
  });

  // success: valid token
  return {
    props: {
      user: user,
      // deals: readDealsInDB,
      deals: sortArray,
    },
  };
}

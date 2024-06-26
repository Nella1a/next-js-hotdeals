/* ******************************* */
/* login (admin) to manage deals
 /* ****************************** */

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { createCsrfToken } from '../util/auth';
import { getValidSessionByToken } from '../util/database';
import { LoginResponseBody } from './api/login';

type Errors = { message: string }[];
type Props = {
  csrfToken: string;
};

export default function Admin(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  return (
    <Layout>
      <Head>
        <title>login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <article>
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              // send username & pw to api
              const loginResponse = await fetch('../api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                  csrfToken: props.csrfToken,
                }),
              });

              // get response from api & check for error message
              const loginResponseBody =
                (await loginResponse.json()) as LoginResponseBody;
              if ('errors' in loginResponseBody) {
                setErrors(loginResponseBody.errors);
                return;
              }

              // Login worked, clear errors and redirect to the welcome page
              setErrors([]);
              // props.refreshUserProfile();
              await router.push(`/deals`);
            }}
          >
            <h1>Admin Login</h1>
            <div>
              <div>
                {errors.map((error) => {
                  return (
                    <div key={`error-${error.message}`}>{error.message}</div>
                  );
                })}
              </div>
              <p>
                {' '}
                <label htmlFor="username">Username</label>
              </p>
              <input
                id="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </div>
            <div>
              <p>
                {' '}
                <label htmlFor="password">Password</label>
              </p>

              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </div>
            <button>Login</button>
          </form>
        </article>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  // 1. Check if there is a token and valid

  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. check if token is valid and redirect to welcome page ->
    // thus user can't login multiple times
    const session = await getValidSessionByToken(token);

    if (session) {
      return {
        redirect: {
          destination: '/deals',
          permanent: false,
        },
      };
    }
  }
  // 3. Generate CSRF token and render the page
  return {
    props: {
      csrfToken: createCsrfToken(),
    },
  };
}

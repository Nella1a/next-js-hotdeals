import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { createCsrfToken } from '../util/auth';
import { getValidSessionByToken } from '../util/database';

type Errors = { message: string }[];

type Props = {
  // refreshUserProfile: () => void;
  csrfToken: string;
};

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  console.log('errors:', errors);
  return (
    <Layout>
      <Head>
        <title>Register Page</title>
        <meta name="Login Page" content="Login to website " />
      </Head>

      <section>
        <article>
          {/* show error message if username already exist  */}
          <div>
            {errors.map((error) => {
              return <div key={`error-${error.message}`}>{error.message}</div>;
            })}
          </div>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              // send username & pw to api
              const registerResponse = await fetch('/api/register', {
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

              // response from api & check for error message
              const registerResponseBody = await registerResponse.json();
              if ('errors' in registerResponseBody) {
                setErrors(registerResponseBody.errors);
                return;
              }
              // Get the query parameter from the Next.js router
              const returnTo = router.query.returnTo;
              console.log('returnTo', returnTo);

              if (
                returnTo &&
                !Array.isArray(returnTo) &&
                // Security: Validate returnTo parameter against valid path
                // (because this is untrusted user input)
                /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
              ) {
                await router.push(returnTo);
                return;
              }

              // Login worked, redirect to the admin page using the Next.js router
              // props.refreshUserProfile();
              await router.push('/deals');
              console.log(registerResponseBody.user.id);
              console.log(registerResponseBody.user.username);
            }}
          >
            <h1>Create account</h1>
            <div>
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

              <p>
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
            <button>Sign Up</button>
            <p>
              Already have an account?
              <Link href="/admin">
                 Login here.
              </Link>
            </p>
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
          destination: '/',
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

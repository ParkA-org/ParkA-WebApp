
import Head from "next/head";
import Navbar from "components/Navbar";

type LayoutProps = {
  pageTitle?: string;
  icon?: string;
  children: React.ReactNode;
};

export default function Layout({
  pageTitle = "ParkA Webapp",
  icon = "/favicon.ico",
  children,
}: LayoutProps): JSX.Element {
  return (
    <div className="container">
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href={icon} />
      </Head>
      <Navbar />
      {children}
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <img src="/icons/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous" ></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossOrigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossOrigin="anonymous"></script>
      <style jsx>{`
        a{
          color:unset;
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          margin: 0 auto;
          max-width: 1080px;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          text-align: center;
          margin-top: 2em;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Mulish", -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
            
          background-color: #f5f5f5;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: 0;
          outline: 0;
          vertical-align: baseline;
        }
      `}</style>
    </div>
  );
}

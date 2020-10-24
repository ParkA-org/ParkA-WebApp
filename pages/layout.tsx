import Head from "next/head"
import Navbar from "components/Navbar"
import Footer from "components/Footer"

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
      <style jsx>{`
        a{
          color:unset;
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          width: 80vw;
          margin: 0 auto;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          text-align: center;
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
          background-color: #fff;
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

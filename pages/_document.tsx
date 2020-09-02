import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";


class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700&family=Righteous&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <div id="modal-root"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

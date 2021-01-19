import Document, { Html, Head as HeadDocument, Main, NextScript } from 'next/document'
import Head from 'next/head'
import { ServerStyleSheet } from 'styled-components'
export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = await renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <HeadDocument>
          {this.props.styleTags}
          <meta charSet='utf-8' />

          <link rel='apple-touch-icon' sizes='180x180' href='/static/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon-16x16.png' />
          <link rel='manifest' href='/static/site.webmanifest' />
          <link rel='shortcut icon' href='/static/favicon.ico' />
          <link rel='mask-icon' href='/static/safari-pinned-tab.svg' color='#1b3454' />
          <meta name='msapplication-TileColor' content='#1b3454' />
          <meta name='msapplication-config' content='/static/browserconfig.xml' />
          <meta name='theme-color' content='#1b3454' />
        </HeadDocument>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

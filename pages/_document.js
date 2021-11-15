import Document, { Html, Head as HeadDocument, Main, NextScript } from 'next/document'
import Head from 'next/head'
import { ServerStyleSheet } from 'styled-components'

let host_name = '/'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const { req } = ctx;
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      host_name = req.headers.host;
      let protocol = req.headers.referer?.split('://');
      if (typeof protocol !== 'undefined') {
        protocol = protocol[0];
        (protocol==='http') ? host_name = 'http://' + host_name : host_name = 'https://' + host_name;
      } else {
        host_name = 'https://' + host_name;
      }

      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
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
          <link rel='canonical' href={host_name} />
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

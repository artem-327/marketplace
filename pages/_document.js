import Document, { Html, Head as HeadDocument, Main, NextScript } from 'next/document'
import Head from 'next/head'
import { ServerStyleSheet } from 'styled-components'
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
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
          {process.env.NODE_ENV === 'production' || process.env.APP_ENV === 'review' ? (
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NSLBBQG');`
              }}></script>
          ) : null}
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
          {process.env.NODE_ENV === 'production' || process.env.APP_ENV === 'review' ? (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<frame src="https://www.googletagmanager.com/ns.html?id=GTM-NSLBBQG"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`
              }}></noscript>
          ) : null}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

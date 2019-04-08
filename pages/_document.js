import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    let bodyClassName
    const page = renderPage((App) => {
      bodyClassName = App.bodyClassName
      return (props) => sheet.collectStyles(<App {...props} bodyClassName={App.bodyClassName} />)
    })
    const styleTags = sheet.getStyleElement()

    return {
      ...page,
      styleTags,
      bodyClassName
    }
  }

  render() {
    const {styleTags, bodyClassName} = this.props

    return (
      <html>
        <Head>
          {styleTags}
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <body className={bodyClassName}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
import Document, { Head, Main, NextScript } from 'next/document';
import { flush } from '../styletron';

import globalStyles from '../styles/index.scss';

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const page = renderPage();
    const styletron = flush();
    const stylesheets = styletron ? styletron.getStylesheets() : [];
    return { ...page, stylesheets };
  }

  render () {
    return (
      <html>
        <Head>
          <title>Calendar</title>
          <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />

          <style dangerouslySetInnerHTML={{__html: globalStyles }} />
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className='_styletron_hydrate_'
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.media || ''}
              key={i}
            />
          ))}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

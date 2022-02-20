import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class Document extends NextDocument {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link
                        rel='preconnect'
                        href='https://fonts.googleapis.com'
                    />
                    <link rel='preconnect' href='https://fonts.gstatic.com' />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap'
                        rel='stylesheet'
                    />
                </Head>
                <body className='transition-colors bg-slate-50 dark:bg-base-200 dark:text-base-content'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Document

import Head from "next/head";

import User from '@neoflix/core/auth/user'
import Navigation from '@neoflix/ui/navigation'
import Footer from '@neoflix/ui/footer'

export interface LayoutProps {
    children: React.ReactElement;
}

export default function Layout({ children }: LayoutProps) {
    const user = undefined

    return (
        <html lang="en">
            <Head>
                {/* <meta charset="UTF-8" /> */}
                <meta name="viewport" content="width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Navigation user={user} />

                {children}
                <Footer />
            </body>
        </html>
    )
  }
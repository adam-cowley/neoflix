import type { AppProps } from 'next/app'

import '@neoflix/ui/css/bootstrap-grid.min.css'
import '@neoflix/ui/css/bootstrap-reboot.min.css'
import '@neoflix/ui/css/owl.carousel.min.css'
import '@neoflix/ui/css/main.css'
import Layout from '../components/Layout'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

import '~/src/styles/index.css'

import { AppLayoutProps } from 'next/app'

import { Layout } from '~/src/components/Layout'

const MyApp = ({ Component, pageProps }: AppLayoutProps) => {
  const layoutProps =
    typeof Component.layoutProps === 'function' ? Component.layoutProps(pageProps) : Component.layoutProps

  return (
    <Layout {...layoutProps}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

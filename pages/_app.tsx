import '~/src/styles/index.css'
import 'focus-visible'

import { AppLayoutProps } from 'next/app'
import { ReactNode } from 'react'

import { Layout } from '~/src/components/layout/Layout'
import usePageBetweenFocus from '~/src/hooks/usePageBetweenFocus'
import useWindowNarrow from '~/src/hooks/useWindowNarrow'

const AppWrapper = ({ children }: { children: ReactNode }) => {
  usePageBetweenFocus()
  useWindowNarrow()

  return <>{children}</>
}

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const layoutProps =
    typeof Component.layoutProps === 'function' ? Component.layoutProps(pageProps) : Component.layoutProps

  return (
    <AppWrapper>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  )
}

export default MyApp

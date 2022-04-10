import '~/src/styles/index.css'

import { AppProps } from 'next/app'

import { CurrentTargetIdProvider } from '~/src/components/contexts/currentTagetId'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CurrentTargetIdProvider>
      <main>
        <Component {...pageProps} />
      </main>
    </CurrentTargetIdProvider>
  )
}

export default MyApp

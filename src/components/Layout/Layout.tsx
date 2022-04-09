import { ReactNode } from 'react'

export type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <main tabIndex={-1} id="main">
    {children}
  </main>
)

export default Layout

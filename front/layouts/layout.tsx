import { ReactElement } from 'react'
import { Header } from '../layouts/header'
import { Footer } from '../layouts/footer'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <div className="content">
      {children}
    </div>
    <Footer />
  </>
)

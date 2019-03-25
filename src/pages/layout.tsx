import * as React from "react"
import { SidebarMenu } from "components/sidebar_menu"
// import { Header } from "components/header"
// import { ProjectPanel } from "components/projects/ProjectPanel"
// import { ClientPanel } from "components/clients/ClientPanel"

type LayoutProps = {
  children: React.ReactNode
}

class Layout extends React.Component<LayoutProps, any> {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        {/* <div className="row">
          <div className="col">
            <Header />
          </div>
        </div> */}
        <div className="sidebar">
          <SidebarMenu />
        </div>
        <div className="main">
          <div className="container-fluid">{children}</div>
        </div>
      </div>
    )
  }
}

export { Layout }

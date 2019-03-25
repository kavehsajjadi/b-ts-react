import { Dashboard } from "pages/dashboard"
import { ProjectsPage } from "pages/projects"
import { ProjectPage } from "pages/project"
import { Quotations } from "pages/quotations"
import { Quotation } from "pages/quotation"
import { InvoicesPage } from "pages/invoices"
import { InvoicePage } from "pages/invoice"

export const routes = [
  {
    component: Dashboard,
    path: "/",
  },
  {
    component: Quotations,
    path: "/projects/:project_id/quotations",
  },
  {
    component: Quotation,
    path: "/projects/:project_id/quotations/:quotation_id",
  },
  {
    component: ProjectsPage,
    path: "/projects",
  },
  {
    component: ProjectPage,
    path: "/projects/:project_id",
  },
  {
    component: InvoicesPage,
    path: "/invoices",
  },,
  {
    component: InvoicePage,
    path: "/invoices/:invoice_id",
  },
]

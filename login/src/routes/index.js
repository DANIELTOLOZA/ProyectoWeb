// All components mapping with path for internal routes

import { lazy } from 'react'

const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))


const routes = [
  //Todos los modulos

  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes

// @material-ui/icons
import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import LoadingScreen from "./components/Common/LoadingScreen";
import AuthGuard from "./components/Common/AuthGuard";
import GuestGuard from "./components/Common/GuestGuard";
import DashboardAdmin from "../src/layouts/DashboardAdmin";
export const renderSwitch = (routes = []) => <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
      const Guard = route.guard || Fragment;
      const Layout = route.layout || Fragment;
      const Component = route.component;
      return <Route key={i} path={route.path} exact={route.exact} render={props => <Guard>
                <Layout>
                  {route.routes ? renderSwitch(route.routes) : <Component {...props} />}
                </Layout>
              </Guard>} />;
    })}
    </Switch>
  </Suspense>;
const routes = [{
  exact: true,
  path: "/404",
  component: lazy(() => import("./views/errors/NotFoundView"))
}, {
  exact: true,
  guard: GuestGuard,
  path: "/",
  component: lazy(() => import("./views/login"))
}, {
  path: "/administrador",
  guard: AuthGuard,
  layout: DashboardAdmin,
  routes: [{
    exact: true,
    path: "/administrador/dashboard",
    component: lazy(() => import("./views/viewAdministrador/dashboardAdmin"))
  }, {
    exact: true,
    path: "/administrador/hospitales",
    component: lazy(() => import("./views/viewAdministrador/Hospitales/Index"))
  }, {
    exact: true,
    path: "/administrador/areas/:threadKey",
    component: lazy(() => import("./views/viewAdministrador/Hospitales/Areas/Index"))
  }, {
    exact: true,
    path: "/administrador/hospitales/habitaciones/:threadKey",
    component: lazy(() => import("./views/viewAdministrador/Hospitales/Habitaciones/Index"))
  }, {
    exact: true,
    path: "/administrador/hospitales/Jefes/:threadKey",
    component: lazy(() => import("./views/viewAdministrador/Hospitales/Jefes/Index"))
  }, {
    exact: true,
    path: "/administrador/hospitales/habitaciones/bombas/:threadKey",
    component: lazy(() => import("./views/viewAdministrador/Hospitales/Bombas/Index"))
  }]
}, {
  path: "/jefe",
  guard: AuthGuard,
  layout: DashboardAdmin,
  routes: [{
    exact: true,
    path: "/jefe/dashboard",
    component: lazy(() => import("./views/dashboard/dashboard"))
  }]
}, {
  path: "/jefeAdmin",
  guard: AuthGuard,
  layout: DashboardAdmin,
  routes: [{
    exact: true,
    path: "/jefeAdmin/dashboard",
    component: lazy(() => import("./views/viewAdministradorJefeAdmin/dashboardAdmin"))
  }, {
    exact: true,
    path: "/jefeAdmin/hospitales/enfermero",
    component: lazy(() => import("./views/viewAdministradorJefeAdmin/Enfermero/Index"))
  }, {
    exact: true,
    path: "/jefeAdmin/hospitales/Paciente",
    component: lazy(() => import("./views/viewAdministradorJefeAdmin/Paciente/Index"))
  }, {
    exact: true,
    path: "/jefeAdmin/hospitales/Equipos",
    component: lazy(() => import("./views/viewAdministradorJefeAdmin/Equipos/Index"))
  }, {
    exact: true,
    path: "/jefeAdmin/hospitales/areas",
    component: lazy(() => import("./views/viewAdministradorJefeAdmin/Hospitales/Areas/Index"))
  }, {
    exact: true,
    path: "/jefeAdmin/hospitales/habitaciones",
    component: lazy(() => import("./views/viewAdministradorJefeAdmin/Hospitales/Habitaciones/Index"))
  }, {
    exact: true,
    path: "/jefeAdmin/hospitales/Jefes/:threadKey",
    component: lazy(() => import("./views/viewAdministradorJefeAdmin/Hospitales/Jefes/Index"))
  }, {
    exact: true,
    path: "/jefeAdmin/hospitales/habitaciones/bombas/:threadKey",
    component: lazy(() => import("./views/viewAdministradorJefeAdmin/Hospitales/Bombas/Index"))
  }]
}];
export default routes;
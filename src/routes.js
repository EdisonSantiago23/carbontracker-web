// @material-ui/icons
import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { LoadingScreen } from "@components";
import AuthGuard from "./Common/AuthGuard";
import GuestGuard from "./Common/GuestGuard";
import Layout from "../src/layouts";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            title={route.title}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("./views/Errors/NotFoundView")),
  },
  {
    exact: true,
    guard: GuestGuard,
    path: "/",
    component: lazy(() => import("./views/Login")),
  },

  {
    path: "/administrador",
    guard: AuthGuard,
    layout: Layout,
    routes: [
      {
        exact: true,
        path: "/administrador/dashboard",
        title: "Dashboard",
        component: lazy(() => import("./views/Dashboard")),
      },
      {
        exact: true,
        path: "/administrador/hospitales",
        title: "Dashboard",
        component: lazy(() => import("./views/Hospitales/Index")),
      },
      {
        exact: true,
        title: "Dashboard",
        path: "/administrador/hospitales/habitaciones/:threadKey",
        component: lazy(() => import("./views/Hospitales/Habitaciones/Index")),
      },
      {
        exact: true,
        title: "Dashboard",
        path: "/administrador/hospitales/personal/:threadKey",
        component: lazy(() => import("./views/Hospitales/Personal/Index")),
      },
    ],
  },

  {
    path: "/jefeAdmin",
    guard: AuthGuard,
    layout: Layout,
    routes: [
      {
        exact: true,
        title: "Dashboard",
        path: "/jefeAdmin/dashboard",
        component: lazy(() => import("./views/Dashboard")),
      },

      {
        exact: true,
        title: "Enfermero",
        path: "/jefeAdmin/hospitales/enfermero",
        component: lazy(() => import("./views/Enfermero/Index")),
      },
    ],
  },
];

export default routes;

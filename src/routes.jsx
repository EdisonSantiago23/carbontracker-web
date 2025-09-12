import React, { Suspense, Fragment, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/Common/LoadingScreen";
import AuthGuard from "./components/Common/AuthGuard";
import GuestGuard from "./components/Common/GuestGuard";
import DashboardAdmin from "../src/layouts/DashboardAdmin";

// Función recursiva para renderizar rutas anidadas
export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  {route.routes ? renderRoutes(route.routes) : <Component />}
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

// Definición de rutas
const routes = [
  {
    path: "/404",
    component: lazy(() => import("./views/errors/NotFoundView")),
  },
  {
    path: "/",
    guard: GuestGuard,
    component: lazy(() => import("./views/login")),
  },
  {
    path: "/administrador/*",
    guard: AuthGuard,
    layout: DashboardAdmin,
    routes: [
      {
        path: "dashboard",
        component: lazy(() => import("./views/viewAdministrador/dashboardAdmin")),
      },
      {
        path: "hospitales",
        component: lazy(() => import("./views/viewAdministrador/Hospitales/Index")),
      },
      {
        path: "areas/:threadKey",
        component: lazy(() => import("./views/viewAdministrador/Hospitales/Areas/Index")),
      },
      {
        path: "hospitales/habitaciones/:threadKey",
        component: lazy(() => import("./views/viewAdministrador/Hospitales/Habitaciones/Index")),
      },
      {
        path: "hospitales/Jefes/:threadKey",
        component: lazy(() => import("./views/viewAdministrador/Hospitales/Jefes/Index")),
      },
      {
        path: "hospitales/habitaciones/bombas/:threadKey",
        component: lazy(() => import("./views/viewAdministrador/Hospitales/Bombas/Index")),
      },
    ],
  },
  {
    path: "/jefe/*",
    guard: AuthGuard,
    layout: DashboardAdmin,
    routes: [
      {
        path: "dashboard",
        component: lazy(() => import("./views/dashboard/dashboard")),
      },
    ],
  },
  {
    path: "/jefeAdmin/*",
    guard: AuthGuard,
    layout: DashboardAdmin,
    routes: [
      {
        path: "dashboard",
        component: lazy(() => import("./views/viewAdministradorJefeAdmin/dashboardAdmin")),
      },
      {
        path: "hospitales/enfermero",
        component: lazy(() => import("./views/viewAdministradorJefeAdmin/Enfermero/Index")),
      },
      {
        path: "hospitales/Paciente",
        component: lazy(() => import("./views/viewAdministradorJefeAdmin/Paciente/Index")),
      },
      {
        path: "hospitales/Equipos",
        component: lazy(() => import("./views/viewAdministradorJefeAdmin/Equipos/Index")),
      },
      {
        path: "hospitales/areas",
        component: lazy(() => import("./views/viewAdministradorJefeAdmin/Hospitales/Areas/Index")),
      },
      {
        path: "hospitales/habitaciones",
        component: lazy(() => import("./views/viewAdministradorJefeAdmin/Hospitales/Habitaciones/Index")),
      },
      {
        path: "hospitales/Jefes/:threadKey",
        component: lazy(() => import("./views/viewAdministradorJefeAdmin/Hospitales/Jefes/Index")),
      },
      {
        path: "hospitales/habitaciones/bombas/:threadKey",
        component: lazy(() => import("./views/viewAdministradorJefeAdmin/Hospitales/Bombas/Index")),
      },
    ],
  },
];

export default routes;

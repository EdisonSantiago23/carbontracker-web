// @material-ui/icons
import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import {LoadingScreen} from "@components";
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
        title:"Dashboard",
        component: lazy(() => import("./views/Dashboard")),

      },
      {
        exact: true,
        path: "/administrador/hospitales",
        title:"Dashboard",
        component: lazy(() => import("./views/Hospitales/Index")),
      },
      {
        exact: true,
        path: "/administrador/soporte",
        title:"Dashboard",
        component: lazy(() => import("./views/Soporte/Index")),
      },
      {
        exact: true,
        title:"Equipos",
        path: "/administrador/Equipos/:IdHospitalEquipo",
        component: lazy(() => import("./views/Equipos/Index")),
      },
      {
        exact: true,
        title:"Estadísticas equipos",
        path: "/administrador/estadistica/:idEquipo",
        component: lazy(() => import("./views/Equipos/Estadisticas")),
      },
      
      {
        exact: true,
        path: "/administrador/areas/:threadKey",
        title:"Dashboard",
        component: lazy(() => import("./views/Hospitales/Areas/Index")),
      },
      {
        exact: true,
        title:"Dashboard",
        path: "/administrador/hospitales/habitaciones/:threadKey",
        component: lazy(() => import("./views/Hospitales/Habitaciones/Index")),
      },
      {
        exact: true,
        title:"Dashboard",
        path: "/administrador/hospitales/personal/:threadKey",
        component: lazy(() => import("./views/Hospitales/Personal/Index")),
      },
      
      {
        exact: true,
        title:"Dashboard",
        path: "/administrador/hospitales/habitaciones/cama/:threadKey",
        component: lazy(() => import("./views/Hospitales/Cama/Index")),
      }
    ],
  },
  
  {
    path: "/monitoreo",
    guard: AuthGuard,
    layout: Layout,
    routes: [
      {
        exact: true,
        path: "/monitoreo/dashboard",
        title:"Dashboard",
        component: lazy(() => import("./views/Monitoreo/dashboard")),
      }
    ],
  },
  
  {
    path: "/jefeAdmin",
    guard: AuthGuard,
    layout: Layout,
    routes: [
      {
        exact: true,
        title:"Dashboard",
        path: "/jefeAdmin/dashboard",
        component: lazy(() => import("./views/Dashboard")),
      },

      
      {
        exact: true,
        title:"Enfermero",
        path: "/jefeAdmin/hospitales/enfermero",
        component: lazy(() => import("./views/Enfermero/Index")),
      },
      {
        exact: true,
        title:"Paciente",
        path: "/jefeAdmin/hospitales/Paciente",
        component: lazy(() => import("./views/Paciente/Index")),
      },
      {
        exact: true,
        title:"Documentos",
        path: "/jefeAdmin/hospitales/Documentos",
        component: lazy(() => import("./views/Documentos/Index")),
      },
      {
        exact: true,
        title:"Historial clínico",
        path: "/jefeAdmin/hospitales/Paciente/historial/:idPaciente",
        component: lazy(() => import("./views/Paciente/HistorialClinico/Index")),
      },
      {
        exact: true,
        title:"Historial clínico",
        path: "/jefeAdmin/hospitales/Paciente/ficha/:idPaciente",
        component: lazy(() => import("./views/Paciente/FichaPaciente/Index")),
      },
      {
        exact: true,
        title:"Equipos",
        path: "/jefeAdmin/hospitales/Equipos",
        component: lazy(() => import("./views/Equipos/Index")),
      },
     

      {
        exact: true,
        path: "/jefeAdmin/hospitales/areas",
        title:"Areas",
        component: lazy(() => import("./views/Hospitales/Areas/Index")),
      },
      {
        exact: true,
        path: "/jefeAdmin/configuraciones/roles",
        title:"Roles",
        component: lazy(() => import("./views/Configuraciones/Roles")),
      },

      
      {
        exact: true,
        path: "/jefeAdmin/configuraciones/funcionalidades",
        title:"Funcionalidades",
        component: lazy(() => import("./views/Configuraciones/Funcionalidades")),
      },
      {
        exact: true,
        path: "/jefeAdmin/configuraciones/menu",
        title:"Funcionalidades",
        component: lazy(() => import("./views/Configuraciones/Menu")),
      },
      {
        exact: true,
        path: "/jefeAdmin/configuraciones/jefes",
        title:"Hospitales",
        component: lazy(() => import("./views/Hospitales/Personal/Index")),
      },
      {
        exact: true,
        path: "/jefeAdmin/configuraciones/estados",
        title:"Estados dosis",
        component: lazy(() => import("./views/Configuraciones/EstadosDosis")),
      },
      {
        exact: true,
        path: "/jefeAdmin/configuraciones/estados",
        title:"Estados dosis",
        component: lazy(() => import("./views/Configuraciones/EstadosDosis")),
      },
    ],
  }
];

export default routes;

import Dashboard from "views/Dashboard/Dashboard.jsx";
import Buttons from "views/Components/Buttons.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Panels from "views/Components/Panels.jsx";
import SweetAlert from "views/Components/SweetAlertPage.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Icons from "views/Components/Icons.jsx";
import Typography from "views/Components/Typography.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import Wizard from "views/Forms/Wizard/Wizard.jsx";
import RegularTables from "views/Tables/RegularTables.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import ReactTables from "views/Tables/ReactTables.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Charts from "views/Charts/Charts.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import UserPage from "views/Pages/UserPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";

import Config from "views/Escuela/Config.jsx";
import Grupos from "views/Escuela/Grupos.jsx";
import Profesores from "views/Escuela/Profesores.jsx";
import Alumnos from "views/Alumnos/Alumnos.jsx";

import pagesRoutes from "./pages.jsx";


var dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: "pe-7s-home",
    component: Dashboard
  },
  {
    collapse:true,
    path: "/pages",
    name: "Pages",
    state: "openPages",
    icon: "pe-7s-settings",
    views: [{
      path: "/pages/singup",
        name: "Sign Up",
        mini: "SU",
        component: RegisterPage
    }]
  },
  {
    collapse: true,
    path: "/escuela",
    name: "Escuela",
    state: "openEscuela",
    icon: "pe-7s-settings",
    views: [
      {
        path: "/escuela/configuracion",
        name: "Configuracion",
        mini: "CN",
        component: Config
      },
      {
        path: "/escuela/grupos",
        name: "Grupos",
        mini: "GP",
        component: Grupos
      },
      {
        path: "/escuela/profesores",
        name: "Profesores",
        mini: "PR",
        component: Profesores
      }
    ]
  },
  {
    path: "/alumnos",
    name: "Alumnos",
    icon: "pe-7s-users",
    component: Alumnos
  },
  { redirect: true, path: "/", pathTo: "/pages/register", name: "Pages" }
];
export default dashboardRoutes;

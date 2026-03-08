
import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("../pages/home/page"));
const MapFinderPage = lazy(() => import("../pages/map-finder/page"));
const RestaurantsPage = lazy(() => import("../pages/restaurants/page"));
const IngredientsPage = lazy(() => import("../pages/ingredients/page"));
const CookingVideosPage = lazy(() => import("../pages/cooking-videos/page"));
const ReviewPage = lazy(() => import("../pages/review/page"));
const AdminPage = lazy(() => import("../pages/admin/page"));
const NotFound = lazy(() => import("../pages/NotFound"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Suspense fallback={null}><HomePage /></Suspense>,
  },
  {
    path: "/map-finder",
    element: <Suspense fallback={null}><MapFinderPage /></Suspense>,
  },
  {
    path: "/restaurants",
    element: <Suspense fallback={null}><RestaurantsPage /></Suspense>,
  },
  {
    path: "/ingredients",
    element: <Suspense fallback={null}><IngredientsPage /></Suspense>,
  },
  {
    path: "/cooking-videos",
    element: <Suspense fallback={null}><CookingVideosPage /></Suspense>,
  },
  {
    path: "/review",
    element: <Suspense fallback={null}><ReviewPage /></Suspense>,
  },
  {
    path: "/admin",
    element: <Suspense fallback={null}><AdminPage /></Suspense>,
  },
  {
    path: "*",
    element: <Suspense fallback={null}><NotFound /></Suspense>,
  },
];

export default routes;

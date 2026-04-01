import "./App.css";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./pages/Layout";
import MovieDetailPage from "./pages/MovieDetailPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies/:category",
        element: <MoviePage />,
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetailPage />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
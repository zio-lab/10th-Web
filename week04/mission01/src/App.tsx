import "./App.css";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./pages/Layout";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";

function MoviePageWrapper() {
  const { category } = useParams<{ category: string }>();

  return <MoviePage key={category} />;
}

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
        element: <MoviePageWrapper />,
      },
      {
        path: "movies/:category/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';

interface RouterProps {
  currentPath: string;
}

const Router = ({ currentPath }: RouterProps) => {
  switch (currentPath) {
    case '/':
      return <HomePage />;
    case '/about':
      return <AboutPage />;
    case '/contact':
      return <ContactPage />;
    default:
      return <NotFoundPage />;
  }
};

export default Router;
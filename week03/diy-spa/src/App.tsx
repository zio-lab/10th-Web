import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Router from './router/Router';

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
        <header className="mb-8 space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">
            ZIO DIY SPA
          </h1>
          <p className="text-gray-600 leading-7">
            History API를 이용하여 React Router 없이 Single Page Application을 직접 구현한 예제입니다.
          </p>
          <p className="rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700">
            현재 경로: <span className="font-semibold">{currentPath}</span>
          </p>
        </header>

        <Navigation />

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <Router currentPath={currentPath} />
        </section>
      </div>
    </main>
  );
};

export default App;
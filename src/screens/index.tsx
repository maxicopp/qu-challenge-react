import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingLayout from './LoadingLayout';
import { useAppLogic } from '@hooks/useAppLogic';
import { routes } from '@constants/routes';

function App() {
  const { loading, initialLoad } = useAppLogic();

  if (loading && !initialLoad) {
    return <LoadingLayout />;
  }

  return (
    <Router>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;

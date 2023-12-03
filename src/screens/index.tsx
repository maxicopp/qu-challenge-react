import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import LoadingLayout from './LoadingLayout';
import MainLayout from './MainLayout';
import PlanetTable from '../components/PlanetTable';
import { useAppLogic } from '../hooks/useAppLogic';
import Films from '../components/Films';
import People from '../components/People';

function App() {
  const {
    search,
    setSearch,
    sortKey,
    handleSortKeyChange,
    sortedPlanets,
    loading,
    initialLoad,
  } = useAppLogic();

  if (loading && !initialLoad) {
    return <LoadingLayout />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/planets"
          element={
            <MainLayout
              search={search}
              setSearch={setSearch}
              sortKey={sortKey}
              handleSortKeyChange={handleSortKeyChange}
            >
              <PlanetTable filteredPlanets={sortedPlanets} />
            </MainLayout>
          }
        />
        <Route
          path="/films"
          element={
            <MainLayout>
              <Films />
            </MainLayout>
          }
        />
        <Route
          path="/people"
          element={
            <MainLayout>
              <People />
            </MainLayout>
          }
        />
        <Route path="/" element={<RedirectToPlanets />} />
      </Routes>
    </Router>
  );
}

function RedirectToPlanets() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/planets');
  }, [navigate]);

  return null;
}

export default App;

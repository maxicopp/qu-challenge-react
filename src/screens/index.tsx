import React from 'react';
import LoadingLayout from './LoadingLayout';
import MainLayout from './MainLayout';
import PlanetTable from '../components/PlanetTable';
import { useAppLogic } from '../hooks/useAppLogic';

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
    <MainLayout
      search={search}
      setSearch={setSearch}
      sortKey={sortKey}
      handleSortKeyChange={handleSortKeyChange}
    >
      <PlanetTable filteredPlanets={sortedPlanets} />
    </MainLayout>
  );
}

export default App;

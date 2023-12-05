import { useAppLogic } from '@hooks/useAppLogic';
import MainLayout from '@layouts/MainLayout';
import PlanetTable from '@components/PlanetTable';

function PlanetsRoute() {
  const { search, setSearch, sortKey, handleSortKeyChange, sortedPlanets } =
    useAppLogic();

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

export default PlanetsRoute;

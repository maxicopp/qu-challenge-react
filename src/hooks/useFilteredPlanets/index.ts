import { useState, useEffect } from 'react';
import { usePlanets } from '../usePlanets';

export function useFilteredPlanets(search: string) {
  const { planets, loading } = usePlanets();
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

  useEffect(() => {
    setFilteredPlanets(
      planets.filter((planet) =>
        planet.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [planets, search]);

  return { filteredPlanets, loading };
}

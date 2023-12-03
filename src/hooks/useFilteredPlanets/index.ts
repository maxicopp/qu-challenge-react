import { useState, useEffect } from 'react';
import { PlanetData } from '../../interfaces/PlanetData';

export function useFilteredPlanets(
  search: string,
  planets: PlanetData[],
  loading: boolean
) {
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

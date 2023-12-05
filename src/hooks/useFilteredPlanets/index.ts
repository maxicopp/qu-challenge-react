import { useState, useEffect } from 'react';
import { PlanetData } from '@interfaces/PlanetData';

export function useFilteredPlanets(
  search: string,
  planets: PlanetData[],
  loading: boolean
) {
  const [filteredPlanets, setFilteredPlanets] = useState<PlanetData[]>([]);

  useEffect(() => {
    if (!loading) {
      setFilteredPlanets(
        planets.filter((planet) =>
          Object.values(planet).some((value) =>
            value.toString().toLowerCase().includes(search.toLowerCase())
          )
        )
      );
    }
  }, [planets, search, loading]);

  return { filteredPlanets, loading };
}

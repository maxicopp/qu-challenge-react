import { PlanetData } from '../interfaces/PlanetData';
import { Planet, PlanetsResponse } from '../interfaces/PlanetsResponse';

export const fetchPlanets = async (): Promise<PlanetData[]> => {
  const response = await fetch('https://swapi.dev/api/planets/');
  const data: PlanetsResponse = await response.json();
  return data.results.map((planet: Planet) => ({
    name: planet.name,
    population: isNaN(parseInt(planet.population, 10))
      ? planet.population
      : parseInt(planet.population, 10),
    climate: planet.climate,
    residents: planet.residents,
  }));
};

export const fetchResidents = async ({
  planetName,
  urls,
}: {
  planetName: string;
  urls: string[];
}) => {
  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const data = await Promise.all(responses.map((response) => response.json()));
  return { planetName, residentNames: data.map((resident) => resident.name) };
};

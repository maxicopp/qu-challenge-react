import { Film } from '@interfaces/Film';

export const fetchFilms = async (): Promise<Film[]> => {
  const response = await fetch('https://swapi.dev/api/films/');
  const data = await response.json();
  return data.results;
};

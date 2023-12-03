export interface PlanetData {
  climate: string;
  name: string;
  population: number | string;
  residents: string[];
  [key: string]: string | number | string[];
}

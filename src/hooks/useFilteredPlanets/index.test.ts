import { renderHook } from '@testing-library/react';
import { useFilteredPlanets } from './index';
import { PlanetData } from '@interfaces/PlanetData';

describe('useFilteredPlanets hook', () => {
  it('filters planets based on search input', () => {
    const planets: PlanetData[] = [
      {
        name: 'Earth',
        population: '7 billion',
        climate: 'temperate',
        residents: [],
      },
      { name: 'Mars', population: '0', climate: 'arid', residents: [] },
    ];

    const { result, rerender } = renderHook(
      ({ search }: { search: string }) =>
        useFilteredPlanets(search, planets, false),
      {
        initialProps: { search: 'earth' },
      }
    );

    expect(result.current.filteredPlanets).toEqual([
      {
        name: 'Earth',
        population: '7 billion',
        climate: 'temperate',
        residents: [],
      },
    ]);

    rerender({ search: 'venus' });

    expect(result.current.filteredPlanets).toEqual([]);
  });
});

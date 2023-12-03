import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchPlanets, fetchResidents } from '../../store/planets/planetsSlice';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { PlanetData } from '../../interfaces/PlanetData';

export function usePlanets() {
  const dispatch: AppDispatch = useDispatch();
  const { planets, loading } = useSelector((state: RootState) => state.planets);

  useEffect(() => {
    const fetchPlanetsAction: AsyncThunkAction<PlanetData[], void, {}> =
      fetchPlanets();
    dispatch(fetchPlanetsAction).then((action) => {
      if (fetchPlanets.fulfilled.match(action)) {
        action.payload.forEach((planet) => {
          if (planet.residents.length > 0) {
            dispatch(
              fetchResidents({
                planetName: planet.name,
                urls: planet.residents,
              })
            );
          }
        });
      }
    });
  }, [dispatch]);

  return { planets, loading };
}

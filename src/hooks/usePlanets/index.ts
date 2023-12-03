import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchPlanets } from '../../store/planets/planetsSlice';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { PlanetData } from '../../interfaces/PlanetData';

export function usePlanets() {
  const dispatch: AppDispatch = useDispatch();
  const { planets, loading, initialLoad } = useSelector(
    (state: RootState) => state.planets
  );

  useEffect(() => {
    if (!initialLoad) {
      const fetchPlanetsAction: AsyncThunkAction<PlanetData[], void, {}> =
        fetchPlanets();
      dispatch(fetchPlanetsAction);
    }
  }, [dispatch, initialLoad]);

  return { planets, loading };
}

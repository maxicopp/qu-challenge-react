import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { PlanetData } from '../../interfaces/PlanetData';
import { fetchPlanetsThunk } from '../../store/planets/planetsSlice';

export function usePlanets() {
  const dispatch: AppDispatch = useDispatch();
  const { planets, loading, initialLoad } = useSelector(
    (state: RootState) => state.planets
  );

  useEffect(() => {
    if (!initialLoad) {
      const fetchPlanetsAction: AsyncThunkAction<PlanetData[], void, {}> =
        fetchPlanetsThunk();
      dispatch(fetchPlanetsAction);
    }
  }, [dispatch, initialLoad]);

  return { planets, loading };
}

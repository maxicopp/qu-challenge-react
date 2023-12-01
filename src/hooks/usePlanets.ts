import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanets } from '../features/planets/planetsSlice';
import { AppDispatch, RootState } from '../store/store';

export const usePlanets = () => {
  const dispatch: AppDispatch = useDispatch();
  const planets = useSelector((state: RootState) => state.planets.planets);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPlanets()).then(() => setLoading(false));
  }, [dispatch]);

  return { planets, loading };
};

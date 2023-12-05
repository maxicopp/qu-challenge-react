import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectToPlanets() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/planets');
  }, [navigate]);

  return null;
}

export default RedirectToPlanets;

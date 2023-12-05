import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingLayout from './LoadingLayout';
import { useAppLogic } from '../hooks/useAppLogic';
import PlanetsRoute from './PlanetsRoute';
import FilmsRoute from './FilmsRoute';
import PeopleRoute from './PeopleRoute';
import RedirectToPlanets from '../utils/RedirectToPlanets';

function App() {
  const { loading, initialLoad } = useAppLogic();

  if (loading && !initialLoad) {
    return <LoadingLayout />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/planets" element={<PlanetsRoute />} />
        <Route path="/films" element={<FilmsRoute />} />
        <Route path="/people" element={<PeopleRoute />} />
        <Route path="/" element={<RedirectToPlanets />} />
      </Routes>
    </Router>
  );
}

export default App;

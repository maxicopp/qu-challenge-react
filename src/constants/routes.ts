import PlanetsRoute from '@screens/PlanetsRoute';
import FilmsRoute from '@screens/FilmsRoute';
import PeopleRoute from '@screens/PeopleRoute';
import RedirectToPlanets from '@utils/RedirectToPlanets';

export const routes = [
  { path: '/planets', component: PlanetsRoute },
  { path: '/films', component: FilmsRoute },
  { path: '/people', component: PeopleRoute },
  { path: '/', component: RedirectToPlanets },
];

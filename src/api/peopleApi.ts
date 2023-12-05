import { PeopleResponse, Person } from '../store/people/peopleSlice';

export const fetchPeople = async (): Promise<Person[]> => {
  const response = await fetch('https://swapi.dev/api/people/');
  const data: PeopleResponse = await response.json();
  return data.results;
};

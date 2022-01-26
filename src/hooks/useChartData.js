import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

export const useChartData = () => {
  const [chartData, setChartData] = useState([]);
  const planets = ['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor'];

  useEffect(() => {
    getPlanetData();
  }, []);
  const getPlanetData = async () => {
    const chartPlanets = await planets.reduce(async (acc, curr) => {
      const planetDetails = await acc;

      const response = await fetch(
        `https://swapi.py4e.com/api/planets/?search=${curr}`
      );
      const { results } = await response.json();
      const [data] = await results;
      const { name, population } = data;
      planetDetails.push({ name, population: Number(population) });

      return planetDetails;
    }, Promise.resolve([]));

    setChartData(chartPlanets);
  };

  return chartData;
};

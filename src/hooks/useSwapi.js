import { useEffect, useState } from 'react';

export const useSwapi = () => {
  const [vehicle, setVehicle] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [swapiData, setSwapiData] = useState([]);

  useEffect(() => {
    getVehicleData();
  }, []);

  useEffect(() => {
    if (vehicle.length !== 0) getPlanetsData();
  }, [vehicle]);

  useEffect(() => {
    if (mergedData.length !== 0) getMappedByVehicle();
  }, [mergedData]);

  // First iterate over vehicles api
  const getVehicleData = async () => {
    let i = 1;
    const vehicles = [];

    while (i !== null) {
      try {
        const response = await fetch(
          `https://swapi.py4e.com/api/vehicles/?page=${i}`
        );
        const { results, next } = await response.json();

        // Filter only vehicles that have pilots.
        vehicles.push(results.filter((res) => res.pilots.length !== 0));
        if (next !== null) i++;
        else i = null;
      } catch (err) {
        console.log(err, 'Error with fetching vehicles data');
      }
    }
    /*Flatten arrays of vehicles to one array with one object 
    so it will be easier to work with*/
    setVehicle(vehicles.flat());
  };

  // Get Planets and pilots details based on vehicles data
  const getPlanetsData = async () => {
    const totalData = await vehicle.reduce(async (acc, val) => {
      const planets = await acc;
      const vehicleName = val.name;

      // Iterate over pilot arrays and fetch pilots + pilots homeworld details.
      const planetsData = await val.pilots.reduce(async (acc, val) => {
        let planetDetails = await acc;

        const pilotResponse = await fetch(val);
        const { name: pilotName, homeworld } = await pilotResponse.json();
        const planetResponse = await fetch(homeworld);
        const { name: planetName, population } = await planetResponse.json();

        // Build arrays
        planetDetails.push({
          vehicleName,
          planetName,
          population: population === 'unknown' ? 0 : Number(population),
          pilotName,
        });

        return planetDetails;
      }, Promise.all([]));

      planets.push(planetsData);
      return planets;
    }, Promise.resolve([]));

    setMergedData(totalData);
    return totalData;
  };

  // Go through the arrays and combine the duplicate vehicleName keys
  // Add population total number
  // Sort array by population number

  const getMappedByVehicle = async () => {
    const mappedVehicles = await mergedData
      .flat()
      .reduce((acc, item) => {
        const vehicle = acc.find((v) => item.vehicleName === v.vehicleName);
        if (!vehicle) {
          acc.push(item);
          return acc;
        } else {
          return acc.map((v) =>
            v.vehicleName === item.vehicleName
              ? {
                  ...v,
                  population: v.population + item.population,
                  planetName: Array.isArray(v.planetName)
                    ? [...v.planetName, item.planetName]
                    : [v.planetName, item.planetName],
                  pilotName: Array.isArray(v.pilotName)
                    ? [...v.pilotName, item.pilotName]
                    : [v.pilotName, item.pilotName],
                  planetPop: Array.isArray(v.planetName)
                    ? [...v.planetName, item.planetName]
                    : [
                        [v.planetName, v.population],
                        [item.planetName, item.population],
                      ],
                }
              : v
          );
        }
      }, [])
      .sort((a, b) => b.population - a.population);
    setSwapiData(mappedVehicles);
  };

  return { swapiData, mergedData };
};

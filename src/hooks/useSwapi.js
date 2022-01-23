import { useEffect, useState } from 'react';

export const useSwapi = () => {
  const [vehicle, setVehicle] = useState([]);
  const [swapiData, setSwapiData] = useState([]);

  useEffect(() => {
    getVehicleData();
  }, []);

  useEffect(() => {
    if (vehicle.length !== 0) getPlanetsData();
  }, [vehicle]);

  //First iterate over vehicles api
  const getVehicleData = async () => {
    let i = 1;
    const vehicles = [];

    while (i !== null) {
      try {
        const response = await fetch(
          `https://swapi.py4e.com/api/vehicles/?page=${i}`
        );
        const { results, next } = await response.json();

        //Filter only vehicles that have pilots.
        vehicles.push(results.filter((res) => res.pilots.length !== 0));
        if (next !== null) i++;
        else i = null;
      } catch (err) {
        console.log(err, 'Error with fetching vehicles data');
      }
    }
    setVehicle(vehicles.flat()); //Flatten arrays of vehicles to one array with one object
  };
  console.log('vehicle output:', vehicle);

  //Get Planets and pilots details based on vehicles data
  const getPlanetsData = () => {
    const planets = vehicle.reduce((acc, val) => {
      const planetDetails = [];
      let obj = {
        vehicleName: val.name,
        planetDetails,
      };

      // Iterate over pilot arrays and fetch pilots + homeworld details.
      val.pilots.reduce(async (acc, val) => {
        try {
          const pilotResponse = await fetch(val);
          let { name: pilotName, homeworld } = await pilotResponse.json();
          const planetResponse = await fetch(homeworld);
          const { name: planetName, population } = await planetResponse.json();
          planetDetails.push({ pilotName, planetName, population });
        } catch (err) {
          console.log(err, 'Error with fetching planet data');
        }
        return acc;
      }, []);

      acc.push(obj);
      return acc;
    }, []);
    setSwapiData(planets);
  };

  console.log('swapiData', swapiData);

  return { swapiData };
};

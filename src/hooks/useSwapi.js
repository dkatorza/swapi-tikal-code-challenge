import React from 'react';

export const useSwapi = () => {
  const [vehicle, setVehicle] = useState([]);

  useEffect(() => {
    getVehicleData();
  }, []);

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

  return <div></div>;
};

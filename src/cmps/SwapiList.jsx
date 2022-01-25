import React from 'react';

export const SwapiList = ({ data }) => {
  console.log('data', data);

  if (!data) return <div>loading the force..</div>;

  return (
    <table className='tableData'>
      <tbody>
        <tr>
          <td>Vehicle name with the largest sum</td>
          {data.map((v, idx) => (
            <td key={idx}>
              <li>{v.vehicleName}</li>
            </td>
          ))}
        </tr>
        <tr>
          <td>Related home planets and their respective population</td>
          {data.map((p, idx) => (
            <td key={idx}>
              {Array.isArray(p.planetName)
                ? p.planetPop.map((s) => (
                    <li>
                      {s[0]}: {s[1]}
                    </li>
                  ))
                : p.planetName + ': ' + p.population}
            </td>
          ))}
        </tr>
        <tr>
          <td>Related pilot names</td>
          {data.map((p, idx) => (
            <td key={idx}>
              {Array.isArray(p.pilotName)
                ? p.pilotName.map((s) => <li>{s}</li>)
                : p.pilotName}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

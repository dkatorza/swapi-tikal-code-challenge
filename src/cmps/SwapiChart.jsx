import React, { useState, useEffect } from 'react';
import { useChartData } from '../hooks/useChartData';

export const SwapiChart = () => {
  const chartData = useChartData();
  const [chartWithRatio, setChartWithRatio] = useState(null);

  useEffect(() => {
    if (chartData.length !== 0) getChartRatio();
  }, []);

  const getChartRatio = () => {
    const maxValue = Math.max(...chartData.map(({ population }) => population));
    const currChart = chartData.map((data) => ({
      ...data,
      ratio: (data.population / maxValue) * 100,
    }));
    setChartWithRatio(currChart);
  };

  return (
    <table className='swapi-chart-wrapper'>
      <tbody>
        <tr />
        <tr className='bars'>
          {chartData.map((chart, idx) => {
            return (
              <td className='bar' key={idx}>
                <span>{chart.population}</span>
                <div
                  className='bar-color'
                  style={{ height: `${chartWithRatio}%` }}></div>
                <p>{chart.name}</p>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

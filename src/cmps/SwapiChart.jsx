import React, { useState, useEffect } from 'react';
import { useChartData } from '../hooks/useChartData';
import { Loader } from './Loader';

export const SwapiChart = () => {
  const chartData = useChartData();
  const [chartWithRatio, setChartWithRatio] = useState(null);

  useEffect(() => {
    if (chartData.length !== 0) getChartRatio();
  }, [chartData]);

  const getChartRatio = () => {
    const maxValue = Math.max(...chartData.map(({ population }) => population));
    const currChart = chartData.map((data) => ({
      ...data,
      ratio: (data.population / maxValue) * 100,
    }));
    setChartWithRatio(currChart);
  };

  if (!chartWithRatio) return <Loader />;
  return (
    <table className='swapi-chart-wrapper'>
      <tbody>
        <tr />
        <tr className='bars'>
          {chartWithRatio.map((chart, idx) => {
            return (
              <td className='bar' key={idx}>
                <span>{chart.population}</span>
                <div
                  className='bar-color'
                  style={{
                    height: `${chart.ratio}%`,
                  }}></div>
                <p>{chart.name}</p>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

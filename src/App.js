import React from 'react';
import '../src/assets/styles/styles.scss';
import { useSwapi } from '../src/hooks/useSwapi';
import { SwapiChart } from './cmps/SwapiChart';
import { SwapiList } from './cmps/SwapiList';
function App() {
  const { swapiData } = useSwapi();

  if (!swapiData) return <div>loading...</div>;
  return (
    <div className='app-general scroller'>
      <header className='App-header'>
        <h1>Star Wars rebel academy trials</h1>
      </header>
      <main>
        <section>
          <SwapiList data={swapiData} />
        </section>
        <section>
          <SwapiChart data={swapiData} />
        </section>
      </main>
    </div>
  );
}

export default App;

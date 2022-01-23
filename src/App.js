import React from 'react';
import '../src/assets/styles/styles.scss';
import { useSwapi } from '../src/hooks/useSwapi';
function App() {
  const { swapiData } = useSwapi();

  return (
    <div className='app-general'>
      <header className='App-header'>
        <h1>Star Wars rebel academy trials</h1>
      </header>
      <main>{swapiData}</main>
    </div>
  );
}

export default App;

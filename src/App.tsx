import React from 'react';
import './App.css';
import VideoDetail from './video-detail';

const App: React.FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <VideoDetail />
      </header>
    </div>
  );
}

export default App;
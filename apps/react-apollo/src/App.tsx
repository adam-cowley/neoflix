import React from 'react'
import Home from './routes/Home';

import '@neoflix/ui/css/bootstrap-grid.min.css'
import '@neoflix/ui/css/bootstrap-reboot.min.css'
import '@neoflix/ui/css/owl.carousel.min.css'
import '@neoflix/ui/css/main.css'
import { Navigation } from '@neoflix/ui';


function App() {
  return (
    <div className="App">
      <Navigation />
      <Home />
    </div>
  );
}

export default App;

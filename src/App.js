import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import AllBanksPage from './pages/AllBanksPage';

function App() {
  return (
    <Switch>
      <Route path="/all-banks">
        <AllBanksPage />
      </Route>
      <Route path="/bank-details/:ifscCode">
        <div>B</div>
      </Route>
      <Route>
        <Redirect to="/all-banks" />
      </Route>
    </Switch>
  )
}

export default App;
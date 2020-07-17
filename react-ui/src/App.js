import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Map from './components/Map';
import Info from './components/Info';

function App() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <br/>
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/chat"></Route>
          <Route path="/map"></Route>
          <Route path="/info"></Route>
        </Switch>
      </div>
    </Router>
  );

}

export default App;

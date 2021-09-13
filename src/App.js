import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const STAGES_QUERY = `
{
  stages {
    id
    name
    events {
      id
      name
    }
  }
}
`

const APPS_QUERY = `
{
  apps{
    id
    name
    stages{
      id
      name
    }
    events{
      id
      name
    }
  }
}`



function App() {

  const [stages, setStages] = useState([]);
  const [apps, setApps] = useState([])

  useEffect(() => {
    getStages()
    getApps()
  }, []);

  const getApps = function(){
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query: APPS_QUERY})
    })
    .then(res => res.json())
    .then(data => setApps(data.data.apps))
  }

  const getStages = function(){
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query: STAGES_QUERY})
    })
    .then(res => res.json())
    .then(data => setStages(data.data.stages))
  }

  return (
    <div className="App">
    <h3>Stages</h3>
      {stages.map(stage => (
        <li key={stage.id}>{stage.name}</li>
      ))}
      <h3>Apps</h3>
      {apps.map(a => (
        <li key = {a.id}>{a.name}</li>
      ))}
    </div>
  );
}

export default App;

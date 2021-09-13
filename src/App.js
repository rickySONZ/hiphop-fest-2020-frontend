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

const EVENTS_QUERY = `
{
  events {
    id
    name
    description
    startsAt
    endsAt
    image
    stage {
      id
      name
    }
  }
}
`



function App() {

  const [stages, setStages] = useState([]);
  const [apps, setApps] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    getStages()
    getApps()
    getEvents()
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

  const getEvents = function(){
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query: EVENTS_QUERY})
    })
    .then(res => res.json())
    .then(data => setEvents(data.data.events))
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
      <h3>Events</h3>
      {events.map(event => (
        <li key={event.id}>{event.name} <img src={event.image}></img></li>
      ))}
    </div>
  );
}

export default App;

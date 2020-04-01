import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {TodoList} from './Components/TodoList';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      tickets: []
    }
  }
 

  componentDidMount() {
 
    fetch('http://localhost:8080/projects')
    .then(response => response.json())
      .then((jsonData) => this.setState({ tickets: jsonData
      }))
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
    }
    
      
      render(){
        return (
          <Router>
          <div>
            
            {
                        this.state.tickets.map((projectdeatil,index)=> {
                        return <h1><Link to="/about">{projectdeatil.name}</Link> </h1>
                       
    
             })}
    
         </div>
          <Switch>
              <Route path="/about">
                <About />
              </Route>

          </Switch>
         </Router>
        );
        
      }
    
  }
  function About() {
    return <h2>About</h2>;
  }

export default App;

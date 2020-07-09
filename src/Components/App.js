import React from 'react';
import TaskManager from './TaskManager';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ProjectsList from './ProjectsList';
import { Switch, Route, HashRouter } from 'react-router-dom';
/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { emphasize } from '@material-ui/core';*/

//import {TodoList} from './TodoList';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/ProjectsList" component={ProjectsList}/>
        <Route path="/taskmanager/:id" component={TaskManager} />
      </Switch>
    </HashRouter>
  );
}

export default App;



  // constructor(){
  //   super();
  //   this.state = {
  //     tickets: []
  //   }
  // }
 

  // componentDidMount() {
 
  //   fetch('http://localhost:8080/projects')
  //   .then(response => response.json())
  //     .then((jsonData) => this.setState({ tickets: jsonData
  //     }))
  //     .catch((error) => {
  //       // handle your errors here
  //       console.error(error)
  //     })
  //   }
    
      
  //     render(){
  //       return (
  //         <Router>
  //         <div>
            
  //           {
  //                       this.state.tickets.map((projectdeatil,index)=> {
  //                       return <h1><Link to="/about">{projectdeatil.name}</Link> </h1>
                       
    
  //            })}
    
  //        </div>
  //         <Switch>
  //             <Route path="/about">
  //               <About />
  //             </Route>

  //         </Switch>
  //        </Router>
  //       );
        
  //     }
    
  // }
  // function About() {
  //   return <h2>About</h2>;
  // }

//export default App;
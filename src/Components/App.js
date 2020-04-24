import React from 'react';
import TrelloList from "./TrelloList";
import {connect} from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//import {TodoList} from './TodoList';

class App extends React.Component {

  render() {

    const { lists } = this.props;
    return(
      <div className="App">
        <h2>Task manager</h2>
        <div style={styles.listsContainer}>
        {lists.map(list => (
        <TrelloList 
        listId={list.id} 
        key={list.id} 
        title={list.title} 
        cards={list.cards} 
        />
        ))}
        <TrelloActionButton list />
        </div>
      </div>
    );
  }
}

const styles={
  listsContainer:{
    display:"flex",
    flexDirection:"row"
  }
};

const mapStateToProps=state=>({
  lists: state.lists
});

export default connect(mapStateToProps) (App);
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

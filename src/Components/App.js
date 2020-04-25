import React from 'react';
import TrelloList from "./TrelloList";
import {connect} from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext} from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { emphasize } from '@material-ui/core';

//import {TodoList} from './TodoList';
const ListContainer=styled.div`
  display:flex;
  flex-direction:row;
`;

class App extends React.Component {

onDragEnd=(result)=>{
 const {destination, source, draggableId}=result;

 if(!destination) {
   return;
 }
this.props.dispatch(
  sort(
  source.droppableId,
  destination.droppableId,
  source.index,
  destination.index,
  draggableId
  )
)
};


  render() {

    const { lists } = this.props;
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
      <div className="App">
        <h2>Task manager</h2>
        <ListContainer>
        {lists.map(list => (
        <TrelloList 
        listId={list.id} 
        key={list.id} 
        title={list.title} 
        cards={list.cards} 
        />
        ))}
        <TrelloActionButton list />
        </ListContainer>
      </div>
      </DragDropContext>
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

import React from 'react';
import TrelloList from "./TrelloList";
import {connect} from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext,Droppable} from "react-beautiful-dnd";
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
 const {destination, source, draggableId,type}=result;

 if(!destination) {
   return;
 }
this.props.dispatch(
  sort(
  source.droppableId,
  destination.droppableId,
  source.index,
  destination.index,
  draggableId,
  type
  )
)
};


  render() {

    const { lists } = this.props;
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
      <div className="App">
        <h2>Task manager</h2>
        <Droppable droppableId="all-lists" direction = "horizontal" type="list">
          {provided =>(
              <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((list,index) => (
              <TrelloList 
              listId={list.id} 
              key={list.id} 
              title={list.title} 
              cards={list.cards} 
              index={index}
              />
              ))}
              {provided.placeholder}
              <TrelloActionButton list />
              </ListContainer>
          )}
        </Droppable>
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Register</a>
          </li>
        </ul>  
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <label className="text-uppercase">Login:</label>
                <input type="text" required />
                <label className="text-uppercase">Password:</label>
                <input type="text" required />
                <input id="sendForm" type="submit" value="Send" />
            </div>
            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                <label className="text-uppercase">Login:</label>
                <input type="text" required />
                <label className="text-uppercase">Password:</label>
                <input type="text" required />
                <input id="sendForm" type="submit" value="Register User" />
            </div>
          </div>      
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

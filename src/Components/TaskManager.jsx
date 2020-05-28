import React from 'react';
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";
import './TodoList/taskmanager.css';

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class TaskManager extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      userToken: localStorage.getItem('token')
    };
    this.handleTableName = this.handleTableName.bind(this);
    this.addTableToDb = this.addTableToDb.bind(this);
  }


  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
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

  handleTableName(event){
    this.setState({
      name: event.target.value
    })
  }

  addTableToDb() {
    console.log('Metoda odpalona');
    var url = 'http://localhost:8080/table?name=' + this.state.name;
    var bearer = 'Bearer ' + this.state.userToken;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': bearer,
      },
      body: null
    }).then((response) => {
      console.log('Succeed!');
    }).catch((error) => {
      console.log('Error during fetch user data');
    });
  }


  render() {

    const { lists } = this.props;
    return (
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col">
            <header className="m-0 navbar bg-success">
              <h2 className="m-0 p-2 navbar-brand"><b className="text-light">task<span className="main-color">Manager</span></b></h2>
            </header>
            <label className="text-uppercase">Table name</label>
            <input type="text" value={this.state.name} onChange={this.handleTableName} />
            <input type="submit" value="Add Table" onClick={this.addTableToDb} />
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div className="App">
                <Droppable droppableId="all-lists" direction="horizontal" type="list">
                  {provided => (
                    <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                      {lists.map((list, index) => (
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
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row"
  }
};

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(TaskManager);
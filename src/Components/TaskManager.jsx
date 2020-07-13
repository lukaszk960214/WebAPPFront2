import React from 'react';
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import { addList, addCard } from "../actions";
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
      userToken: localStorage.getItem('token'),
      toDoName: '',
      inProgress: '',
      TaskManager1: {},
      isFetched: false,
      list: [],
      card: []
    };
    this.handleTableName = this.handleTableName.bind(this);
    this.addTableToDb = this.addTableToDb.bind(this);
    this.getDataFromDb = this.getDataFromDb.bind(this);
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

  handleTableName(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleInProgressName(event) {
    this.setState({
      inProgress: event.target.value
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

  componentDidMount() {
    this.fetchTask();
  }

  fetchTask() {
    var url = 'http://localhost:8080/table/' + this.props.match.params.id;
    var bearer = 'Bearer ' + this.state.userToken;
    console.log(bearer);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authorization': bearer,
      },
      body: null
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Error during fetch user data - response to ');
      }
    })
      .then(data => {
        this.setState({ TaskManager1: data });
        this.setState({ list: data.lists });
        console.log(data);
      }
      )
      .catch((error) => {
        console.log('Error during fetch user data');
      });
    this.getDataFromDb();
  }



  getDataFromDb() {
    console.log("Metoda odpalnoa!");
    console.log(this.state.isFetched);
    const { dispatch } = this.props;
    if (!this.state.isFetched && this.state.list.length !== 0) {
      console.log(this.state.list.length);
      this.state.list.map((list, listKey) => {
        dispatch(addList(list.name));
      })
      console.log(this.state.list.cards);
      this.setState({ isFetched: true });
    }
  }


  render() {
    const { lists } = this.props;
    return (
      <body>
        <div className="container-fluid p-0">
          <div className="row m-0">
            <div className="col p-0">
              <header className="m-0 navbar bg-success">
                <h2 className="m-0 p-2 navbar-brand"><b className="text-light">task<span className="main-color">Manager</span></b></h2>
              </header>
              {!this.state.isFetched ? this.getDataFromDb() : null}
              <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="App">
                  <Droppable droppableId="all-lists" direction="horizontal" type="list">
                    {provided => (
                      <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                        {this.state.list.length !== 0 ? this.state.list.map((list, index) => (
                          <TrelloList
                            listId={list.id}
                            key={list.id}
                            title={list.name}
                            cards={list.cards}
                            index={index}
                          />
                        )): null}
                        {provided.placeholder}
                        <TrelloActionButton list tableId={this.props.match.params.id} />
                      </ListContainer>
                    )}
                  </Droppable>
                </div>
              </DragDropContext>
            </div>
          </div>
        </div>
      </body>
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
import React from 'react';
import './TodoList/taskmanager.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



class ProjectsList extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            userToken: localStorage.getItem('token'),
            toDoName: '',
            inProgress: '',
            tickets: []
        }
        this.handleTableName = this.handleTableName.bind(this);
        this.addTableToDb = this.addTableToDb.bind(this);
    }
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

    renderProducts() {
        return this.state.tickets.map((projectdetail, index) => {
            return (
                <tr>
                    <td>{projectdetail.cards}</td>
                </tr>
            );
        })
    }
    componentDidMount() {
        this.fetchProjects();
    }

    fetchProjects() {
        var bearer = 'Bearer ' + this.state.userToken;
        console.log(bearer);
        fetch('http://localhost:8080/tables', {
            method: 'get',
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
            .then((jsonData) => this.setState({
                tickets: jsonData
            }))
            .catch((error) => {
                console.log('Error during fetch user data');
            });
    }

    // componentDidMount() {
    //     fetch('http://localhost:8080/table')
    //     .then(response =>{
    //         return response.json();
    //     })
    //     .then(tickets=>{
    //         this.setState({tickets});
    //     });
    //   }

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
            window.location.reload(false);
        }).catch((error) => {
            console.log('Error during fetch user data');
        });
    }

    taskDetails(id) {
        this.props.history.push("/taskManager/" + id);
    }

    render() {
        const { lists } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-success">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <h2 className="m-0 p-2 navbar-brand"><b className="text-light">task<span className="main-color">Manager</span></b></h2>
                            </li>
                        </ul>
                        <div className="navbar-nav">
                            <input type="text" className="form-control" placeholder="Project name..." value={this.state.name} onChange={this.handleTableName} />
                            <div className="input-group-append">
                                <button className="btn btn-warning" onClick={this.addTableToDb} type="submit">Add</button>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="table-responsive">
                    <table className="table table-hover bg-warning p-5 mx-auto w-auto">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Board Name - {this.state.tickets.length} projects in total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tickets.map((ticket, index) =>
                                <tr key={index}>
                                    <td onClick={() => this.taskDetails(ticket.id)} scope='row'>{index + 1}</td>
                                    <td onClick={() => this.taskDetails(ticket.id)}>{ticket.name}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}

export default ProjectsList;
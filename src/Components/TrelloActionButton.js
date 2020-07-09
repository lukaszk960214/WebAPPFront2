import React from "react";
import Icon from "@material-ui/core/Icon";
import  Textarea from 'react-textarea-autosize';
import { Card, rgbToHex}  from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {connect} from"react-redux";
import {addList, addCard} from "../actions";
import { Router, Route, browserHistory, IndexRoute} from 'react-router'

class TrelloActionButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            formOpen: false,
            text: "",
            userToken: localStorage.getItem('token')
    
        };
    }

    openForm = () => {
        this.setState({
            formOpen: true
        });
    };
    
    closeForm = () =>{
        this.setState({
            formOpen: false
        });
    };

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        });
    };
    
    handleAddList = () => {
        const {dispatch} = this.props;
        const {text} = this.state;

        if(text){
            this.setState({
                text: ""
            });
            dispatch(addList(text))
        }
        
        console.log(this.state.userToken);
        var url = 'http://localhost:8080/list/?arrayId=' + this.props.tableId + '&listItemName='+this.state.text;
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

        return;
    };

    

    handleAddCard = () => {
        const {dispatch, listId}= this.props;
        const {text}=this.state;
        console.log(this.props.listId)
        if(text){
            this.setState({
                text: "",
                strId: ""
            });
            dispatch(addCard(listId,text))
        }
        
        var strId=this.props.listId;
        console.log(listId)
        var text2=String(strId).substring(7,8)
        console.log(text2)
        var url = 'http://localhost:8080/card/?cardName=' + this.state.text + '&listId='+text2;
        console.log(url)
        console.log(this.state.userToken);
        var bearer = 'Bearer ' + this.state.userToken;
        //http://localhost:8080/card/?cardName=test&listId=1
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

        return;
        
    };



    getData = () => {
        const {dispatch} = this.props;
        const {text} = this.state;

        if(text){
            this.setState({
                text: ""
            });
            dispatch(addList(text))
        }
        
        console.log(this.state.userToken);
        var url = 'http://localhost:8080/list/?arrayId=' + this.props.tableId + '&listItemName='+this.state.text;
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

        return;
    };







    renderAddButton = () => {
       const {list} = this.props;

       const buttonText = list ? "Add another list" : "Add another card";
       const buttonTextOpacity = list ? 1 : 0.7;
       const buttonTextColor = list ? "white" : "inherit";
       const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";
       
       return (
              <div 
              onClick={this.openForm}
              style = {{
                  ...styles.openFormButtonGroup,

                  opacity: buttonTextOpacity,
                  color: buttonTextColor , 
                  backgroundColor: buttonTextBackground,
                }}
                >
                 <Icon>add</Icon>
                    <p
                    style = {{
                        margin: "0px",
                        color: "rgb(0,0,0)",
                    }}
                    > {buttonText} </p>
              </div>
       );
    };

   renderForm = () => {
       const {list} = this.props;

       const placeholder = list 
       ? "Enter list title... "
        : "Enter a title for this card...";

        const buttonTitle = list ? "Add List " : "Add Card";
      return (
      <div>
          <Card style={{
              overflow: "visible",
              minWidth: 272,
              minHeight: 80,
              padding: "6px 8px 2px"
          }}>
            <Textarea 
            placeholder={placeholder} 
            autoFocus 
            onBlur={this.closeForm}
            value={this.state.text}
            onChange={this.handleInputChange}
            style ={{
                resize: "none",
                width: "100%",
                overflow: "hidden",
                outline: "none",
                border: "none"

            }}
            />
          </Card>
          <div style={styles.formButtonGroup}>
              <Button onMouseDown={list ? this.handleAddList : this.handleAddCard} variant="contained" style={{color: "white",backgroundColor: "#5aac44"}}>
                  {buttonTitle}{" "} 
              </Button>
              <Icon style= {{marginLeft: 8,cursor:"pointer"}}>close</Icon>
          </div>
      </div>
      );
   };

   render(){
       console.log(this.props)
    return this.state.formOpen ? this.renderForm() : this.renderAddButton()
        }

}

const styles = {
    openFormButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 5,
        height: 36,
        width: 272,
        paddingLeft: 10,
    },
    FormButtonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems : "center"
    }
}

export default connect() (TrelloActionButton);
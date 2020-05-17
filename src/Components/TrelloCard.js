import React from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

const CardContainer=styled.div`
margin: 10px;
box-shadow: 2px 2px 4px grey;
`;

const TrelloCard=({text, id, index})=>{

    return (
        <Draggable draggableId={String(id)} index={index}>
            {prvided =>(
                <CardContainer
                ref={prvided.innerRef} 
                {...prvided.draggableProps} 
                {...prvided.dragHandleProps}
                >
         <Card>
            <CardContent>
                <Typography gutterBottom>{text}</Typography>
            </CardContent>
        </Card>
        </CardContainer>
            )}
       
        </Draggable>
    );
};

const styles={
    cardContainer:{
        marginBottom:8
    }
}

export default TrelloCard;
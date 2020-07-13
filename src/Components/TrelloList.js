import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListContainer = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin: 20px;
    box-shadow: 2px 2px 4px grey;
`;

const TrelloList = ({ title, cards, listId, index }) => {
    return (
        <Draggable draggableId={String(listId)} index={index}>
            {provided => (
                <ListContainer {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps} >
                    <Droppable droppableId={String(listId)}>
                        {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <h4>{title}</h4>
                                {cards.map((card, index) => (
                                    <TrelloCard
                                        key={card.id}
                                        index={index}
                                        text={card.name}
                                        id={card.id} />
                                ))}
                                <TrelloActionButton listId={listId} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>

    );
};



export default TrelloList;
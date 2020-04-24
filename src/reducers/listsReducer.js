
import { CONSTANTS } from "../actions";
let listId=2;
let cardID=5;
const initialState=[
    {
        title:"To do",
        id: 'list-${0}',
        cards: [
            {
                id:'card-${0}',
                text:"create list and static card"
            },
            {
                id:'card-${1}',
                text:"use material UI React"
            }
        ]
    },
    {
        title:"In progress",
        id: 'list-${1}',
        cards: [
            {
                id:'card-${2}',
                text:"create other list"
            },
            {
                id:'card-${3}',
                text:"render many cards"
            },
            {
                id:'card-${4}',
                text:
                "make some little changes"
            }
        ]
    },
    
];

const listsReducer = (state= initialState, action) => {
    switch(action.type) {

        case CONSTANTS.ADD_LIST:
            const newList ={
               title: action.payload,
               cards:[],
                id: 'list-${listID}'
            }
          listId += 1;
          return [...state,newList];

          case CONSTANTS.ADD_CARD:
              const newCard = {
                  text: action.payload.text,
                  id: 'card-${cardID}'
              }
              cardID += 1;

              const newState =state.map(list => {
                  if(list.id === action.payload.listId){
                      return{
                          ...list,
                          cards: [...list.cards,newCard]
                      }
                  } else {
                      return list;
                  }
              });

              return newState;
        default:
        return state;
    }
};

export default listsReducer;
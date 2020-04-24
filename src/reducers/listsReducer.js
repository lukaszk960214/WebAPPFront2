
import { CONSTANTS } from "../actions";
let listId=2;
let cardID=4;
const initialState=[
    {
        title:"To do",
        id: 0,
        cards: [
            {
                id:0,
                text:"create list and static card"
            },
            {
                id:1,
                text:"use material UI React"
            }
        ]
    },
    {
        title:"In progress",
        id: 1,
        cards: [
            {
                id:0,
                text:"create other list"
            },
            {
                id:1,
                text:"render many cards"
            },
            {
                id:2,
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
                id: listId
            }
          listId += 1;
          return [...state,newList];

          case CONSTANTS.ADD_CARD:
              const newCard = {
                  text: action.payload.text,
                  id: cardID
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
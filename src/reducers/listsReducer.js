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
        id: 0,
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
        default:
        return state;
    }
};

export default listsReducer;
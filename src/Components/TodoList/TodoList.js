import React, { useState } from './node_modules/react';

import Todo from './Todo';




function TodoList(props){
    const [todolist,setTodoList]=useState(["Moje zadanie","Moje zadanie2","Moje zadanie3"]);
    return(
    <div>
        Moja Apliacja todolist
        {todolist.map((todo) => (
          <Todo
          todo = {todo}/>
        ))}
        
    </div>
    
    )
}

export default TodoList;
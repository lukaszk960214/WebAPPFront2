import React from './node_modules/react';
import TodoList from './TodoList';



function Todo(props){

    
    return(
    <div>
        
      <a href ="www.google.pl" > {props.todo}  </a>
     
    </div>


    )
}

export default Todo;
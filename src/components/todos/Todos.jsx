import React,{memo} from 'react'
import {TodoList} from '../../components/todos/index'

const Todos = memo(({todos,completedTodo}) => {
    console.log('Todo')
    return (
        <ul>
      {todos.map((todo,index) => 
        <TodoList 
            todo={todo} 
            key={index} 
            completedTodo={completedTodo}
            index={index} 
        /> 
      )}
    </ul>
    )
})

export default Todos

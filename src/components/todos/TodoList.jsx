import React,{memo} from 'react'

const TodoList = memo( ({todo,completedTodo,index}) => {
    console.log('TodoList')
    return (
        <li style={ todo.isCompleted === true ? {textDecorationLine: 'line-through'}:{}}>
            { todo.todo }
            {/* { todo.isCompleted === true ? '--完了' : '--未完'} */}
            <button onClick={()=>completedTodo(index)} 
                style={{marginLeft:'.8rem'}}>
                完了
            </button>
        </li>
    )
})

export default TodoList

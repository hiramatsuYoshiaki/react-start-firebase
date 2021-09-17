import React,{useState,useCallback,useMemo} from 'react'
import { Todos } from '../components/todos/index'

const Todo = () => {
    console.log('Todo');
    
    const todoLists = [
        {
            todo: 'Learn vue.js',
            isCompleted: false
        },
        {
            todo: 'Learn React',
            isCompleted: false
        },
        {
            todo: 'Learn Laravel',
            isCompleted: true
        },
    ]
    const [todo,setTodo] = useState('')
    const inputTodo = (e) => {
        setTodo( e.target.value )
      }
    const [todos,setTodos] = useState(todoLists)
    const addTodo = (e) => {
        e.preventDefault()
        setTodos(todos => [...todos,{todo:todo, isCompleted:false}])
        setTodo('')
    }
    //useCallback(関数対して設定する)--------------------
    //関数はコンポーネントの再描写の度に新しい関数が作成されるため
    //inputに一文字入力されるたびにtodo.jsxは再描画されcompletedTodo関数も
    //新しく作成される。
    //Todos,TodoListはpropsで新しく作成された
    //completeTodoを受け取っているので再描写されます。
    //useCallbackを設定することでinput要素に文字を入力しても
    //依存関係に設定しているtodosが更新されるまで、Todo, TodoListの再描写が抑えらる
    const completedTodo = useCallback(index => {
        console.log(index);
        let newTodos = todos.map((todo,todoIndex)=>{
            if(todoIndex === index){
                todo.isCompleted = !todo.isCompleted
            }
            return todo
        })
        setTodos(newTodos)
    },[todos])
    //userMemo(値に対して設定する)
    //useMemoがない場合はinput要素に文字を入力するとその都度フィルタリングされます。
    //todosに変更があった場合のみuseMemo内の値の再計算をおこないます。
    //input要素に文字を入力すると再描画が行われるがnotCompletedTodosの値の再計算は行われない
    //todosに渡すpropsが変更されないため、memoでラッピングされているtodosは再描画されない。
    const notCompleteTodos = useMemo(() => todos.filter(todo => {
        console.log('filter')
        return todo.isCompleted === false
      }),[todos])
    

    return (
        <div>
            <form 
                onSubmit={ addTodo }
            >
                <input  
                    type="text" 
                    value={todo} 
                    onChange={inputTodo}
                    name='todo'
                />
                <input type="submit" value="入力" />
            </form>
            {/* React.memo(コンポーネント対して設定する)---------------------------- */}
            {/* todosはmemoでラッピングされているため */}
            {/* propsのtodosが更新されないと再描画されない */}
            {/* さらに子要素のtodolistも再描画されない */}
            {/* <Todos todos={todos} completedTodo={completedTodo}/> */}
             {/* useMemo(値対して設定する)---------------------------- */}
            {/* todosに変更があった場合のみuseMemo内のnotCompleteTodos値の再計算をおこないます。 */}
            <Todos todos={notCompleteTodos} completedTodo={completedTodo}/>
        </div>
    )
}

export default Todo

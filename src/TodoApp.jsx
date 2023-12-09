import { useState } from "react";
import './todo.css';
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

function NoTasks(){
	return <li className="no-tasks">No Tasks Found</li>
}
 
export default function TodoApp(){
	const [todo, setTodo] = useState('');
	const [todo_list, setTodoList] = useState([]);

	function getTodoListItemObject(value = '', status = false){
		return {
			value : value,
			completed : status
		};
	}

	function updateTodoList(value){
		if(!value){ 
			window.alert("Please enter the value!");
			return;
		}
		setTodoList((list) => [...list, getTodoListItemObject(value) ]);
		setTodo('');
	}

	function removeTodoListItem(index){
		if(window.confirm('Are you sure you want to remove this item?')){
			const newList = [...todo_list];
			newList.splice(index, 1);
			setTodoList(newList);
		}
	}

	function updateTodoListItemStatus(index, status){
		const newList = [...todo_list];
		newList[index]['completed'] = status;
		setTodoList(newList);
	}

	function editTodoListItem(index){
		const currItem =  todo_list[index];
		const editedItem = window.prompt('Please enter the value!', currItem['value']);
		if(!editedItem){
			if(editedItem !== null) window.alert('Item value cannot be empty');
			return;
		}
		const newList = [...todo_list];
		newList.splice(index, 1, getTodoListItemObject(editedItem, currItem['completed']));
		setTodoList(newList);
	}

	const App = (
		<section className="todo-app-container">
			{/* App Title */}
		    <h3>Todo App</h3>

			{/* Todo Form */}
			<div className="todo-form-section">
				<input 
				    type="text"
					value={todo}
					onInput={(e) => setTodo(e.target.value)}
					placeholder="Please enter your todo"
				/>
				<button onClick={() => updateTodoList(todo)}>+</button>
			</div>

			{/* Todo List */}
			<div className="todo-list-section">
				<ul className="todo-list">
					{(todo_list.length > 0)
					    ? todo_list.map((item, i) => {
							return (
								<li 
									className="todo-list-item"
									key={i}
								>
								    <span className="todo-list-item-completed-check">
									    <input 
										    value="completed" 
										    type="checkbox" 
										    checked={item['completed']}
										    onChange={() => updateTodoListItemStatus(i, (item['completed']) ? false : true)} 
										/>
								    </span>
									<span className={`todo-list-item-content ${(item['completed']) ? 'done' : ''}`}>{item['value']}</span>
									<span className="todo-list-item-actions">
										<button onClick={() => removeTodoListItem(i)} ><AiOutlineDelete /></button>
										<button onClick={() => editTodoListItem(i)} ><MdEdit /></button>
									</span>
								</li>
							);
						})

						: <NoTasks/>
					}
				</ul>
			</div>
		</section>
	);
	return App;
}
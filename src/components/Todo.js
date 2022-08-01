
import { useState, useRef, } from "react";


export default function Todo() {
  const [list, setList] = useState([1, 2, 3]);
  const [currentTodo, setCurrentTodo] = useState({});
  const [isEditing, setEditing] = useState(false);
  const todoInputRef = useRef(null);

  const create = () => {
    console.log(todoInputRef.current.value);


    setList((previous) => [...previous, todoInputRef.current.value]);
  };

  // function handleEditInputChange(e) {
  //   // console.log(currentTodo);
  //   /* setCurrentTodo({ ...currentTodo, text: e.target.value }); */
  //   {
  //     isEditing && (
  //       <form onSubmit={handleEditFormSubmit}>
  //         <button type="submit">Update</button>
  //         <h2>Edit Todo</h2>
  //         <label htmlFor="editTodo">Edit todo: </label>
  //         <input
  //           name="editTodo"
  //           type="text"
  //           placeholder="Edit todo"
  //           value={currentTodo.text}
  //           onChange={handleEditInputChange}
  //         />
  //         <button type="submit">Update</button>
  //       </form>
  //     )
  //   };

  const remove = (event) => {

    const itemToRemove = parseInt(event.target.id);

    setList((previous) => previous.filter((item, i) => i !== itemToRemove));
  };
  console.log(list);

  return (

    <div className="Todo">
      <h1>Todo List</h1>
      <input ref={todoInputRef} id="todo-input" type="text" />
      <button onClick={create}>add to list</button>
      {list.map((item, i) => (
        <li onClick={remove} id={i}>
          {item}
        </li>
        // 🗑️
      ))}
    </div>
  );
  // function handleIInputChange(e) {
  //   setList(e.target.value);
  // }
  // function handleFormSubmit(e) {
  //   e.preventDefault();
  //   <form onSubmit={handleFormSubmit}>
  //     <input
  //       name="list"
  //       type="text"
  //       placeholder="Create a new todo"
  //       value={list}
  //     // onChange={handleInputChange}
  //     />
  //   </form>
};

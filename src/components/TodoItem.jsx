import React, { useState } from "react";

function TodoItem({
  title,
  status,
  todoId,
  userId,
  todoList,
  setTodoList,
  deleteTodo,
  updateTodo,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [todoEditText, setTodoEditText] = useState(title);
  const handleClickEdit = (event) => {
    setIsEdit(!isEdit);
  };
  const handleChangeEditInput = (event) => {
    setTodoEditText(event.target.value);
  };
  const handleUpdateTodo = async () => {
    // Handle edit function โดยเอาค่า todoEditText ไปส่ง
    console.log("Update is requested");
    let response = await updateTodo(todoId, userId, title);
    console.log(res);
    setIsEdit(!isEdit);
  };
  return (
    <div className="todoitem">
      <input type="checkbox" className="todoitem__checkbox"></input>
      {isEdit ? (
        <div>
          <input
            // onClick={handleClickEdit}
            onChange={handleChangeEditInput}
            value={todoEditText}
            type="text"
            className="todoItem__name"
          ></input>
          <button onClick={handleUpdateTodo}>save</button>
        </div>
      ) : (
        <div onClick={handleClickEdit} className="todoitem__name">
          {title}
        </div>
      )}
      <button
        onClick={() => deleteTodo(todoId, userId, title)}
        className="todoitem__delBtn"
      >
        x
      </button>
    </div>
  );
}

export default TodoItem;

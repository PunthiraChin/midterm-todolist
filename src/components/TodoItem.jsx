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
  const [isChecked, setIsChecked] = useState(false);
  const handleClickEdit = (event) => {
    setIsEdit(!isEdit);
  };
  const handleChangeEditInput = (event) => {
    setTodoEditText(event.target.value);
  };
  const handleUpdateTodo = async () => {
    // Handle edit function โดยเอาค่า todoEditText ไปส่ง
    console.log("Update is requested");
    await updateTodo(todoId, userId, todoEditText, isChecked);
    setIsEdit(!isEdit);
  };
  const handleCheckBox = async (event) => {
    setIsChecked((prev) => event.target.checked);
    await updateTodo(todoId, userId, todoEditText, isChecked);
  };
  return (
    <div className="todoitem">
      <input
        onChange={handleCheckBox}
        type="checkbox"
        className="todoitem__checkbox"
      ></input>
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
        <div
          onClick={handleClickEdit}
          className={isChecked ? "todoItem__name-checked" : "todoItem__name"}
        >
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

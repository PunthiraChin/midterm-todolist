import React from "react";

function TodoItem({ title, status }) {
  return (
    <div className="todoitem">
      <div>{title}</div>
      <div>x</div>
    </div>
  );
}

export default TodoItem;

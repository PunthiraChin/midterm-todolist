import React, { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";
import * as todoAPI from "../apis/todoApi";

function TodoPage() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    // ต้องเอา user ID มาจาก user ใน AuthContext อีกที แต่ mock ไปก่อน คือ 13
    getAllTodoOfUser(6);
  }, []);
  const getAllTodoOfUser = async (userId) => {
    try {
      const response = await todoAPI.getAllTodo(userId);
      console.log("status", response.data.status);
      console.log("data", response.data.data);
      setTodoList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="todoPage">
      <div>My Todo</div>
      <div className="addTodo">
        <button>new task</button>
        <input type="text" placeholder="write your new task" />
      </div>
      <div className="todoList">
        {todoList.map((todo) => (
          <TodoItem title={todo?.title} status={todo?.status} />
        ))}
      </div>
    </div>
  );
}

export default TodoPage;

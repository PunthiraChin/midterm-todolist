import React, { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";
import * as todoAPI from "../apis/todoApi";

function TodoPage() {
  const [todoList, setTodoList] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  /// เดี๋ยวเอา user มาจาก AuthContext อีกที ตอนนี้ hard code ไปก่อน
  const userId = 13;
  useEffect(() => {
    // ต้องเอา user ID มาจาก user ใน AuthContext อีกที แต่ mock ไปก่อน คือ 13
    getAllTodoOfUser(userId);
  }, []);

  const getAllTodoOfUser = async (userId) => {
    try {
      const response = await todoAPI.getAllTodo(userId);
      console.log("get alltodo status", response.data.status);
      //   console.log("data", response.data.data);
      setTodoList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputNewTodoText = (event) => {
    setNewTodoText(event.target.value);
  };
  const submitNewTodo = async () => {
    try {
      console.log("trying to create post");
      let todoData = { title: newTodoText };
      const response = await todoAPI.createTodo(todoData, userId);
      console.log("get alltodo status", response.data.status);
      let newTodoItem = response.data.data;
      /// set new todo list with ค่าที่เพิ่งโพสต์ไป
      let newTodoList = [newTodoItem, ...todoList];
      setTodoList(newTodoList);
      console.log(todoList);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTodo = async (todoId, userId, todoTitle) => {
    try {
      console.log("trying to delete post");
      let todoData = { title: todoTitle };
      const response = await todoAPI.deleteTodo(todoId, userId, todoData);
      if (response?.data !== null) {
        //ทำการ delete data จาก todoList โดย ind
        let foundedIndex = todoList.findIndex((todo) => todo.id === todoId);
        if (foundedIndex != -1) {
          let newTodoList = [...todoList];
          newTodoList.splice(foundedIndex, 1);
          setTodoList(newTodoList);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateTodo = async (todoId, userId, todoTitle) => {
    try {
      console.log("trying to update post");
      let todoData = { title: todoTitle, status: true };
      const response = await updateTodo(todoId, userId, todoData);
      let newTodo = response.data;
      console.log(newTodo);
      if (response?.data !== null) {
        let foundedIndex = todoList.findIndex((todo) => todo.id === todoId);
        if (foundedIndex != -1) {
          let newTodoList = [...todoList];
          newTodoList.splice(foundedIndex, 1, newTodo);
          setTodoList(newTodoList);
        }
      }
      // find index ก่อน แล้วค่อย update data
    } catch (err) {
      console.log(err);
    }
  };
  // Delete todo from the list >> ต้องส่ง function เข้าไปข้างใน

  return (
    <div className="todoPage">
      <div>My Todo</div>
      <div className="addTodo">
        <button onClick={submitNewTodo} className="addTodo__addBtn">
          Add new task
        </button>
        <input
          value={newTodoText}
          onChange={handleInputNewTodoText}
          className="addTodo__input"
          type="text"
          placeholder="write your new task"
        />
      </div>
      <div className="todoList">
        {todoList.map((todo) => (
          <TodoItem
            key={todo?.id}
            title={todo?.title}
            status={todo?.status}
            todoId={todo?.id}
            userId={userId}
            todoList={todoList}
            setTodoList={setTodoList}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoPage;

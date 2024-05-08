import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import * as todoAPI from "../apis/todoApi";
import { AuthContext } from "../context/AuthContext";

function TodoPage() {
  const { user, setUser } = useContext(AuthContext);
  const [todoList, setTodoList] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const userId = user.user.id;
  const navigate = useNavigate();
  useEffect(() => {
    // ต้องเอา user ID มาจาก user ใน AuthContext อีกที แต่ mock ไปก่อน คือ 13
    console.log("userId", userId);
    getAllTodoOfUser(userId);
  }, []);
  const handleLogout = () => {
    setUser("");
    navigate("/login");
  };
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
  const updateTodoItem = async (todoId, userId, todoTitle, status) => {
    try {
      console.log("trying to update post:", todoId);
      let todoData = { title: todoTitle, status: status };
      const response = await todoAPI.updateTodo(todoId, userId, todoData);
      let newTodo = response.data.data;
      if (response?.data !== null) {
        let foundedIndex = todoList.findIndex((todo) => todo.id === todoId);
        if (foundedIndex != -1) {
          let newTodoList = [...todoList];
          newTodoList.splice(foundedIndex, 1, newTodo);
          setTodoList(newTodoList);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="todoPage">
      <div className="myTodo">My Todo</div>
      <div className="addTodo">
        <button onClick={submitNewTodo} className="addTodo__addBtn">
          New task
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
            updateTodo={updateTodoItem}
          />
        ))}
      </div>
      <button onClick={handleLogout} className="logoutBtn">
        LOG OUT
      </button>
    </div>
  );
}

export default TodoPage;

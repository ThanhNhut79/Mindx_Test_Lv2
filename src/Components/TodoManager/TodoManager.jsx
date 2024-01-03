import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Todo from "../Todo/Todo";
import "./index.css";
import useLocalStorage from "../Hook/useLocalStorage";

const TodoManager = () => {
  const [menuActive, setMenuActive] = useState("all");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useLocalStorage("todos", []);
  useEffect(() => {
    if (todoList) {
      setTodoList(todoList);
    }
  }, []);
  function handleChange(event) {
    setTodo(event.target.value);
  }
  function addTodo(event) {
    event.preventDefault();

    var item = {
      id: Math.random().toString() + todo,
      text: todo,
      checked: false,
    };

    setTodoList((prev) => {
      return [...prev, item];
    });

    setTodo("");
  }

  function deleteTodo(id) {
    const itemsDelete = todoList.filter((item) => {
      return item.id !== id;
    });

    setTodoList(itemsDelete);
  }

  function deleteCompleted() {
    const itemsDelete = todoList.filter((item) => {
      return item.checked !== true;
    });
    setTodoList(itemsDelete);
    setMenuActive("all");
  }
  return (
    <>
      <div className="header">
        <h1 className="title">#todo</h1>
      </div>
      <div className="main">
        <div className="menu">
          <div className="menuOption" onClick={() => setMenuActive("all")}>
            <span>All</span>
            <div
              className={menuActive === "all" ? "underlineActive" : "underline"}
            ></div>
          </div>

          <div className="menuOption" onClick={() => setMenuActive("active")}>
            <span>Active</span>
            <div
              className={
                menuActive === "active" ? "underlineActive" : "underline"
              }
            ></div>
          </div>

          <div
            className="menuOption"
            onClick={() => setMenuActive("completed")}
          >
            <span>Completed</span>
            <div
              className={
                menuActive === "completed" ? "underlineActive" : "underline"
              }
            ></div>
          </div>
        </div>
        <div className="dashline" />
        {menuActive !== "completed" ? (
          <form onSubmit={addTodo}>
            <div className="inputAdd">
              <input
                type="text"
                name="todo"
                placeholder="Add details"
                className="input"
                onChange={handleChange}
                value={todo}
              />

              <button
                type="submit"
                className="addButton"
                disabled={todo ? false : true}
              >
                Add
              </button>
            </div>
          </form>
        ) : null}
        {todoList
          ? todoList.map((item) => {
              if (menuActive === "completed" && !item.checked) {
                return;
              } else if (menuActive === "active" && item.checked) {
                return;
              }

              return (
                <Todo
                  key={item.id}
                  menuActive={menuActive}
                  todo={item}
                  deleteTodo={deleteTodo}
                />
              );
            })
          : null}
        {menuActive === "completed" ? (
          <div className="deleteContainer">
            <button
              type="button"
              className="deleteButton"
              onClick={deleteCompleted}
            >
              <MdDeleteOutline />
              <span>Delete All</span>
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TodoManager;

import React, { useState } from "react";
import "./App.css";
import { Todo } from "./components";

export type todo_type = { id: number; label: string };

function App() {
  const [value, set_value] = useState("");
  const [todo_list, set_list] = useState<todo_type[]>([]);

  const delete_task = (id: number) => {
    const new_list = todo_list.filter((todo) => todo.id != id);

    set_list([...new_list]);
  };

  const update_task = (todo: todo_type) => {
    const curr_todo = todo_list.filter(
      (list_todo) => todo.id != list_todo.id
    )[0];

    todo_list[todo_list.indexOf(curr_todo)] = todo;
    set_list([...todo_list]);
  };

  const list = todo_list.map((todo) => (
    <Todo update_todo={update_task} delete_task={delete_task} todo={todo} />
  ));

  const input = (e: React.FormEvent<HTMLInputElement>) =>
    set_value(e.currentTarget.value);

  const add_todo = () => {
    if (!value) return alert("You didn't specify a new task!");

    const new_todo: todo_type = {
      id: (todo_list[todo_list.length - 1]?.id || 0) + 1,
      label: value,
    };

    set_list([...todo_list, new_todo]);
    set_value("");
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="head-wrapper">
          <input
            value={value}
            onInput={input}
            className="text-field"
            placeholder="Plug your todo here"
          />
          <button onClick={add_todo} className="add-button">
            Add
          </button>
        </div>
        <div className="body-wrapper">{list}</div>
      </div>
    </div>
  );
}

export default App;

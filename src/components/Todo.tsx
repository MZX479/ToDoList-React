import { todo_type } from "../mainApp";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import { ImCheckmark2 } from "react-icons/im";
import React, { useState } from "react";

type props_type = {
  todo: todo_type;
  delete_task: (id: number) => void;
  update_todo: (todo: todo_type) => void;
};

type mod_type = "view" | "edit";

export const Todo = (props: props_type) => {
  const [completed, set_completed] = useState<boolean>(false);
  const { todo, delete_task, update_todo } = props;
  const [mode, set_mode] = useState<mod_type>("view");
  const [new_label, set_new_label] = useState(todo.label);

  const del = () => {
    delete_task(todo.id);
    set_completed(false);
  };

  const complete = () => {
    set_completed(true);

    setTimeout(() => del(), 3000);
  };

  const edit = () => {
    set_mode("edit");
  };

  const save = () => {
    todo.label = new_label;
    update_todo(todo);
    set_mode("view");
  };

  const new_input = (e: React.FormEvent<HTMLInputElement>) => {
    set_new_label(e.currentTarget.value);
  };

  const label =
    mode === "view" ? (
      <div className="label">
        {todo.id}) {todo.label}
      </div>
    ) : (
      <div className="label">
        <input
          className="new-label"
          onInput={new_input}
          value={new_label}
          placeholder="Place your new value here"
        />
      </div>
    );

  const mode_button =
    mode === "view" ? (
      <AiOutlineEdit onClick={edit} />
    ) : (
      <AiOutlineSave onClick={save} />
    );
  return (
    <div className={`todo ${completed ? "completed" : ""}`}>
      {label}
      <div className="manage-todo">
        {mode_button}
        <ImCheckmark2 onClick={complete} />
        <AiOutlineDelete onClick={del} />
      </div>
    </div>
  );
};

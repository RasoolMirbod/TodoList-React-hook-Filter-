import { useEffect, useRef, useState } from "react";

const TodoForm = ({ buttonLable = "Add", edit, submitTodo }) => {
  const [input, setInput] = useState(edit ? edit.text : "");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const changeHandler = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!input) {
      alert("enter todo !");
      return;
    }

    submitTodo(input);
    // props.addTodoHandler(input);
    setInput("");
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="foromControl">
        <input
          type="text"
          value={input}
          onChange={changeHandler}
          placeholder="Add new value"
          ref={inputRef}
        />
        <button
          className={`btn ${edit ? "updateTodo" : "addtodo"}`}
          type="submit"
        >
          {buttonLable}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;

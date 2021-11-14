import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");

  //todos ?
  useEffect(() => {
    filterTodos(selectedOption.value);
  }, [todos, selectedOption]);

  const addTodo = (input) => {
    // console.log(input);
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      text: input,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const completeTodo = (id) => {
    // item=> findIndex => clone
    const index = todos.findIndex((todo) => todo.id === id);
    // clone: Do Not Mutate
    const selectedTodo = { ...todos[index] };
    selectedTodo.isCompleted = !selectedTodo.isCompleted;
    //clone :todos :
    const updatedTodos = [...todos];
    updatedTodos[index] = selectedTodo;
    setTodos(updatedTodos);
  };
  const removeTodo = (id) => {
    console.log(id);
    const filteredTodos = todos.filter((t) => t.id !== id);
    setTodos(filteredTodos);
  };
  const updateTodo = (id, newValue) => {
    console.log(id);
    const index = todos.findIndex((todo) => todo.id === id);

    const selectedTodo = { ...todos[index] };
    selectedTodo.text = newValue;

    const updatedTodos = [...todos];
    updatedTodos[index] = selectedTodo;
    setTodos(updatedTodos);
  };
  const filterTodos = (status) => {
    switch (status) {
      // case "All":
      //   setFilteredTodos(todos);
      //   break;
      case "Completed":
        setFilteredTodos(todos.filter((t) => t.isCompleted));
        break;
      case "Uncompleted":
        setFilteredTodos(todos.filter((t) => !t.isCompleted));
        break;
      default:
        setFilteredTodos(todos);
    }
  };
  const selectHandler = (e) => {
    setSelectedOption(e);
    filterTodos(e.value);
  };
  return (
    <div className="container">
      <NavBar
        unCompletedTodos={todos.filter((t) => !t.isCompleted).length}
        selectedOption={selectedOption}
        onChange={selectHandler}
      />
      <TodoForm submitTodo={addTodo} />
      <TodoList
        todos={filteredTodos}
        onComplete={completeTodo}
        onDelete={removeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
};

export default TodoApp;

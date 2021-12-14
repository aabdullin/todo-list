import React, { createContext, useContext, useReducer, useState } from "react";
import ReactDOM from "react-dom";

// const fakeData = [
//   {
//     id: 1,
//     description: "cleaning",
//   },
//   {
//     id: 1,
//     description: "laundry",
//   },
//   {
//     id: 1,
//     description: "cooking",
//   },
//   {
//     id: 1,
//     description: "coding preparation",
//   },
// ];

const todoContext = createContext({
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
});
const TodoProvider = ({ children }) => {
  function todoReducer(state, action) {
    console.log(state);
    console.log(action);
    switch (action.type) {
      case "add":
        return {
          todos: [
            {
              ...action.todo,
              id: state.todos.length + 1,
            },
            ...state.todos,
          ],
        };
      case "edit":
        return {
          todos: state.todos.map((u) => {
            if (u.id === action.todo.id) {
              return action.todo;
            }

            return u;
          }),
        };
      case "reset":
        return {
          keys: "",
        };
      default:
        throw new Error();
    }
  }
  const [todosState, todosDispatch] = useReducer(todoReducer, { todos: [] });

  const addTodo = (todo) => {
    todosDispatch({ type: "add", todo });
  };

  const editTodo = (todo) => {
    todosDispatch({ type: "edit", todo });
  };

  return (
    <todoContext.Provider
      value={{
        todos: [...todosState.todos],
        addTodo,
        editTodo,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};

const useTodos = () => {
  const context = useContext(todoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a UsersProvider");
  }
  return context;
};

function ViewTodos() {
  const { todos, addTodo } = useTodos();
  const [todo, setTodo] = useState("");
  return (
    <>
      <input
        type="text"
        name="todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            addTodo({
              description: todo,
            });
            setTodo("");
          }
        }}
      />
      <ul>
        Todo List:
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id} {todo.description}
          </li>
        ))}
      </ul>
    </>
  );
}

// function ToDoList({ }) {
//   return (
//     <ul>
//       Todo List:
//       {todoItems.map((todo) => (
//         <li key={todo.id}>
//           {todo.id} {todo.description}
//         </li>
//       ))}
//     </ul>
//   );
// }

// function ToDoList1({ todoItems }) {
//   return (
//     <ul>
//       {todoItems.map((todo) => {
//         console.log(todo);
//         return (
//           <li key={todo.id}>
//             {todo.id} {todo.description}
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

ReactDOM.render(
  <TodoProvider>
    <ViewTodos />
  </TodoProvider>,
  document.querySelector("#root")
);

import {createContext, useContext} from "react";


export const TodoContext = createContext({
   todo: [
    {
      id: 1,
      todo: "Todo msg",
      isCompleted: false
    }
   ],

   addTodo: (todo) => {},
   updatedTodo: (todo, id) => {},
   removeTodo: (id) => {},
   togleCompleted: (id) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
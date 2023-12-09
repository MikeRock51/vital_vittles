import { createContext, useContext, useReducer } from "react";

const RecipesContext = createContext();

const initialState = {
    
}

const reducer = 

export default function RecipesProvider({ children }) {


  const [state, dispatch] = useReducer(reducer, initialState);

  return <RecipesContext.Provider>{children}</RecipesContext.Provider>;
}

export function useRecipesContext() {
  const context = useContext(RecipesContext);

  if (context === undefined) {
    return new Error("Context used outside of Recipes Provider");
  }

  return context;
}

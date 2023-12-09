import { createContext, useContext, useReducer } from "react";

const RecipesContext = createContext();

const initialState = {

    recipes: {
        data: []
    
},
    currentPage: 1

function reducer(state,action) {
   switch (action.type) {
    case "GET_RECIPES": {
      const newData = action.payload; 
      return {
        ...state,
        recipes: {
          data: [...state.recipes.data, ...newData.data],
        },
      };
    }
      case "CREATE_RECIPES": {
      return {
        ...state,
        recipes: {
          data: [...state.recipes.data, action.payload],
        },
      };
    }
    default:
      return state;
  }
}

export default function RecipesProvider({ children }) {


  const [{recipes, currentPage}, dispatch] = useReducer(reducer, initialState);

  return <RecipesContext.Provider value={{recipes, currentPage, dispatch}}>{children}</RecipesContext.Provider>;
}

export function useRecipesContext() {
  const context = useContext(RecipesContext);

  if (context === undefined) {
    return new Error("Context used outside of Recipes Provider");
  }

  return context;
}

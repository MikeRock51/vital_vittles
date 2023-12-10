import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";

const RecipesContext = createContext();

const initialState = {
  recipes: {
    data: [],
  },
  currentPage: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_RECIPES": {
      const newData = action.payload;
      return {
        ...state,
        recipes: {
          data: state.recipes.data.concat(newData.data),
        },
      };
    }
    case "CREATE_RECIPES": {
      return {
        ...state,
        recipes: {
          data: state.recipes.data.concat(action.payload),
        },
      };
    }
    case "NEXT_PAGE": {
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    }

    case "SEARCH_RECIPES": {
      const newSearchTerm = action.payload;
      const filteredData = state.recipes.data.filter((recipe) =>
        recipe.name.toLowerCase().includes(newSearchTerm.toLowerCase()),
      );
      return {
        ...state,
        recipes: {
          data: filteredData,
        },
      };
    }
    default:
      return state;
  }
}

export default function RecipesProvider({ children }) {
  const [{ recipes, currentPage }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const [searchTerm, setSearchTerm] = useState("");

  const contextValue = useMemo(
    () => ({
      recipes,
      currentPage,
      dispatch,
      searchTerm,
      setSearchTerm,
    }),
    [recipes, currentPage, dispatch, searchTerm, setSearchTerm],
  );

  // const memoizedDispatch = useMemo(() => dispatch, [dispatch]);

  return (
    <RecipesContext.Provider value={contextValue}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipesContext() {
  const context = useContext(RecipesContext);

  if (context === undefined) {
    throw new Error("Context used outside of Recipes Provider");
  }

  return context;
}

// function reducer(state, action) {
//   switch (action.type) {
//     case "GET_RECIPES": {
//       const newData = action.payload;
//       return {
//         ...state,
//         recipes: {
//           data: [...state.recipes.data, ...newData.data],
//         },
//       };
//     }
//     case "CREATE_RECIPES": {
//       return {
//         ...state,
//         recipes: {
//           data: [...state.recipes.data, action.payload],
//         },
//       };
//     }

//     case "NEXT_PAGE": {
//       return {
//         ...state,
//         currentPage: action.payload + 1,
//       };
//     }
//     default:
//       return state;
//   }
// }

// export default function RecipesProvider({ children }) {
//   const [{ recipes, currentPage }, dispatch] = useReducer(
//     reducer,
//     initialState,
//   );

//   return (
//     <RecipesContext.Provider value={{ recipes, currentPage, dispatch }}>
//       {children}
//     </RecipesContext.Provider>
//   );
// }

// export function useRecipesContext() {
//   const context = useContext(RecipesContext);

//   if (context === undefined) {
//     return new Error("Context used outside of Recipes Provider");
//   }

//   return context;
// }

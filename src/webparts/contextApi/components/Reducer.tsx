export const initialState = {
  MyDatas: [],
  MyContext:{}
};

export const cruds = (state, action) => {
  switch (action.type) {
    case "ADD_NEW":
      return {
        ...state,
        MyDatas: action.payload,
      };
    case "Edit":
      return {
        ...state,
        MyDatas: action.payload,
      };
    case "Delete":
      return {
        ...state,
        MyDatas: action.payload,
      };
      case "MyContextData":
      return { 
        ...state,
        MyContext:action.payload
      }
    default:
      return state;
  }
};

const initialState = {
  users: [],
  movies: [],
  members: [],
  subscriptions: []
};


const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_STORE':
      return { ...state, users: action.payload.users, movies: action.payload.movies, members: action.payload.members, subscriptions: action.payload.subscriptions }

    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };

    case 'EDIT_USER':
      const arr = [...state.users]
      const index = arr.findIndex(user => user.id === action.payload.id)
      arr[index] = action.payload

      return { ...state, users: arr };

    case 'DELETE_USER':
      // remove form users array
      const arr1 = [...state.users]
      const index1 = arr1.findIndex(u => u.id === action.payload.id)
      arr1.splice(index1, 1)

      return { ...state, users: arr1 };

    case 'ADD_MOVIE':
      return { ...state, movies: [...state.movies, action.payload] };

    case 'EDIT_MOVIE':
      const arr2 = [...state.movies]
      const index2 = arr2.findIndex(movie => movie._id === action.payload._id)
      arr2[index2] = action.payload

      return { ...state, movies: arr2 };

    case 'DELETE_MOVIE':
      // remove form movies array
      const arr3 = [...state.movies]
      const index3 = arr3.findIndex(movie => movie._id === action.payload.id)
      arr3.splice(index3, 1)

      return { ...state, movies: arr3 };

    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.payload] };

    case 'EDIT_MEMBER':
      const arr4 = [...state.members]
      const index4 = arr4.findIndex(member => member._id === action.payload._id)
      arr4[index4] = action.payload

      return { ...state, members: arr4 };

    case 'DELETE_MEMBER':
      // remove form members array
      const arr5 = [...state.members]
      const index5 = arr5.findIndex(member => member._id === action.payload.id)
      arr5.splice(index5, 1)

      return { ...state, members: arr5 };


    case 'ADD_SUBSCRIPTION':
      const arr8 = [...state.subscriptions]
      const index8 = arr8.findIndex(subscription => subscription.memberId === action.payload.memberId)
      arr8[index8].movies = [...arr8[index8].movies, { movieId: action.payload.movieId, date: action.payload.date }]
      return { ...state, subscriptions: [...state.subscriptions, arr8] };

    case 'ADD_NEW_SUBSCRIPTION':
      return { ...state, subscriptions: [...state.subscriptions, action.payload] };

    case 'EDIT_SUBSCRIPTION':
      const arr6 = [...state.subscriptions]
      const index6 = arr6.findIndex(subscription => subscription.memberId === action.payload._id)
      arr6[index6] = action.payload

      return { ...state, subscriptions: arr6 };

    case 'DELETE_SUBSCRIPTION':
      // remove form subscriptions array
      const arr7 = [...state.subscriptions]
      const index7 = arr7.findIndex(subscription => subscription._id === action.payload.id)
      arr7.splice(index7, 1)

      return { ...state, subscriptions: arr7 };


    default:
      return state;
  }
};

export default storeReducer;

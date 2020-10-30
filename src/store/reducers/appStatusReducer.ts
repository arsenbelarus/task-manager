const TOGGLE_LOADING = "TOGGLE_LOADING";


const initState = {
  loading: false
}


export const appStatusReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return {...state, loading: !state.loading}
    default:
      return state
  }
}

export const toggleLoadingAC = (loading: boolean) => ({type: TOGGLE_LOADING, loading } as const)


type ActionType = ReturnType<typeof toggleLoadingAC>

export type AppStatusReducerType = {
  loading: boolean
}
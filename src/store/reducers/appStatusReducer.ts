const TOGGLE_LOADING = "TOGGLE_LOADING";
const SET_REDIRECTION_URL = "SET_REDIRECTION_URL";
const TOGGLE_IS_MODAL = "TOGGLE_IS_MODAL";


const initState = {
  loading: false,
  isModalOpen: false,
  url: "",
}


export const appStatusReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {...state, loading: !state.loading}
    case SET_REDIRECTION_URL:
      return {...state, url: action.url}
    case TOGGLE_IS_MODAL:
      return {...state, isModalOpen: action.isOpen}
    default:
      return state
  }
}

export const toggleLoadingAC = (loading: boolean) => ({type: TOGGLE_LOADING, loading } as const)
export const toggleIsModalOpenAC = (isOpen: boolean) => ({type: TOGGLE_IS_MODAL, isOpen } as const)
export const setUrl = (url: string) => ({type: SET_REDIRECTION_URL, url } as const)


type ActionType =
  | ReturnType<typeof toggleLoadingAC>
  | ReturnType<typeof toggleIsModalOpenAC>
  | ReturnType<typeof setUrl>

export type AppStatusReducerType = {
  loading: boolean,
  url: string,
  isModalOpen: boolean,
}
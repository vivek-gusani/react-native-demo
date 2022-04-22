import { ActionTypes } from './MyProgress.actions'

const {
  ADD_PROGRESS_LOG_FAILED,
  ADD_PROGRESS_LOG_SUCCEEDED,
  ADD_PROGRESS_LOG_REQUESTED,
  GET_PROGRESS_LOG_REQUESTED,
  GET_PROGRESS_LOG_SUCCEEDED,
  GET_PROGRESS_LOG_FAILED,
  GET_PROGRESS_COUNT_REQUESTED,
  GET_PROGRESS_COUNT_SUCCEEDED,
  GET_PROGRESS_COUNT_FAILED,
} = ActionTypes

const initialState = {
  error: undefined,
  loading: false,
  addLoading: false,
  countLoading: false,
  data: [],
  countStats: {},
}

export default function myProgress(
  state: typeof initialState = initialState,
  action: { type: keyof typeof ActionTypes; payload: any },
) {
  switch (action.type) {
    case ADD_PROGRESS_LOG_REQUESTED: {
      return { ...state, addLoading: true }
    }

    case ADD_PROGRESS_LOG_SUCCEEDED: {
      return { ...state, addLoading: false }
    }

    case ADD_PROGRESS_LOG_FAILED: {
      return { ...state, addLoading: false }
    }

    case GET_PROGRESS_LOG_REQUESTED: {
      return { ...state, loading: true }
    }

    case GET_PROGRESS_LOG_SUCCEEDED: {
      return { ...state, data: action.payload, loading: false }
    }

    case GET_PROGRESS_LOG_FAILED: {
      return { ...state, loading: false }
    }

    case GET_PROGRESS_COUNT_REQUESTED: {
      return { ...state, countLoading: true }
    }

    case GET_PROGRESS_COUNT_SUCCEEDED: {
      console.log('__DEBUG__ action.payload', action.payload)
      return { ...state, countStats: action.payload, countLoading: false }
    }

    case GET_PROGRESS_COUNT_FAILED: {
      return { ...state, countLoading: false }
    }
    default:
      return state
  }
}

export const ActionTypes = {
  ADD_PROGRESS_LOG_REQUESTED: 'ADD_PROGRESS_LOG_REQUESTED',
  ADD_PROGRESS_LOG_SUCCEEDED: 'ADD_PROGRESS_LOG_SUCCEEDED',
  ADD_PROGRESS_LOG_FAILED: 'ADD_PROGRESS_LOG_FAILED',
  GET_PROGRESS_LOG_REQUESTED: 'GET_PROGRESS_LOG_REQUESTED',
  GET_PROGRESS_LOG_SUCCEEDED: 'GET_PROGRESS_LOG_SUCCEEDED',
  GET_PROGRESS_LOG_FAILED: 'GET_PROGRESS_LOG_FAILED',
  GET_PROGRESS_COUNT_REQUESTED: 'GET_PROGRESS_COUNT_REQUESTED',
  GET_PROGRESS_COUNT_SUCCEEDED: 'GET_PROGRESS_COUNT_SUCCEEDED',
  GET_PROGRESS_COUNT_FAILED: 'GET_PROGRESS_COUNT_FAILED',
}

export default class Actions {
  static addProgressLogRequested(payload: any) {
    return { type: ActionTypes.ADD_PROGRESS_LOG_REQUESTED, payload }
  }
  static addProgressLogSucceeded(event: any) {
    return { type: ActionTypes.ADD_PROGRESS_LOG_SUCCEEDED, event }
  }
  static addProgressLogFailed(error: Error) {
    return {
      type: ActionTypes.ADD_PROGRESS_LOG_FAILED,
      payload: { error },
    }
  }

  static getProgressLogRequested(payload: any) {
    return { type: ActionTypes.GET_PROGRESS_LOG_REQUESTED, payload }
  }
  static getProgressLogSucceeded(data: any) {
    return { type: ActionTypes.GET_PROGRESS_LOG_SUCCEEDED, payload: { data } }
  }
  static getProgressLogFailed(error: Error) {
    return {
      type: ActionTypes.GET_PROGRESS_LOG_FAILED,
      payload: { error },
    }
  }

  static getProgressLogCountRequested(payload: any) {
    return { type: ActionTypes.GET_PROGRESS_COUNT_REQUESTED, payload }
  }
  static getProgressLogCountSucceeded(data: any) {
    console.log('__DEBUG__ getProgressLogCountSucceeded', data)
    return { type: ActionTypes.GET_PROGRESS_COUNT_SUCCEEDED, payload: data }
  }
  static getProgressLogCountFailed(error: Error) {
    return {
      type: ActionTypes.GET_PROGRESS_COUNT_FAILED,
      payload: { error },
    }
  }
}

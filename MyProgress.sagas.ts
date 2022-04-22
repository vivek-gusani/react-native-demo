import { put, takeLatest, call } from 'redux-saga/effects'

import { Actions as NavAction } from 'navigation/SagaNavigation'
import Actions, { ActionTypes } from './MyProgress.actions'
import {
  addProgressLogAsync,
  getProgressLogAsync,
  getProgressLogCountsAsync,
} from 'api/myProgress'

import i18n from 'ex-react-native-i18n'
import moment from 'moment'

function* addProgressLog({ payload }: any) {
  try {
    const data: any = yield call(addProgressLogAsync, payload)
    yield put(Actions.addProgressLogSucceeded(data))
    let msg = i18n.t(
      payload?.id
        ? 'health.log.add.weight.success'
        : 'health.log.add.weight.success',
    )

    if (payload.type === 'whr') {
      msg = i18n.t(
        payload?.id
          ? 'health.log.add.whr.success'
          : 'health.log.add.whr.success',
      )
    }
    yield put(NavAction.showLocalSuccess(msg))
    const toDate = moment().endOf('date')
    const fromDate = moment().subtract(3, 'months')
    yield put(
      Actions.getProgressLogCountRequested({
        patientUuid: payload?.patientUuid,
        fromDate: fromDate.format(),
        toDate: toDate.format(),
      }),
    )
  } catch (err) {
    const error: any = err
    yield put(Actions.addProgressLogFailed(err))
    yield put(NavAction.showLocalError(error?.message))
  }
}

function* getProgressLog({ payload }: any) {
  try {
    const data: any = yield call(getProgressLogAsync, payload)
    yield put(Actions.getProgressLogSucceeded(data))
  } catch (err) {
    const error: any = err
    yield put(Actions.getProgressLogFailed(err))
    yield put(NavAction.showLocalError(error?.message))
  }
}

function* getProgressCountLog({ payload }: any) {
  try {
    const data: any = yield call(getProgressLogCountsAsync, payload)
    console.log('__DEBUG__ data', data)
    yield put(Actions.getProgressLogCountSucceeded(data))
  } catch (err) {
    const error: any = err
    yield put(Actions.getProgressLogCountFailed(err))
    yield put(NavAction.showLocalError(error?.message))
  }
}

export default [
  takeLatest(ActionTypes.ADD_PROGRESS_LOG_REQUESTED, addProgressLog),
  takeLatest(ActionTypes.GET_PROGRESS_LOG_REQUESTED, getProgressLog),
  takeLatest(ActionTypes.GET_PROGRESS_COUNT_REQUESTED, getProgressCountLog),
]

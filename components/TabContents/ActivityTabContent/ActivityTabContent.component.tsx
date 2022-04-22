import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native'

import { Icon, Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import i18n from 'ex-react-native-i18n'
import { Color } from 'constants/Color'

import styles from './ActivityTabContent.styles'
import calendarConstants from 'screens/CalendarEvent/constants/calendarConstants'
import { Action } from 'redux'

import MyProgressActions from './../../../MyProgress.actions'

interface Props {
  dispatch(action: Action): void
  patientUuid: string
  data: any
  countLoading: any
}

const statusKeys = {
  done: 'DONE',
}

const eventsKeys = {
  coaching: 'coaching',
  activity: 'activity',
  nutrition: 'nutrition',
  exercise: 'exercise',
}

export class ActivityTabContent extends Component<Props> {
  state = {
    filterType: 'day',
  }
  componentDidMount() {
    this.getData()
  }

  getData() {
    const { patientUuid, dispatch } = this.props
    dispatch(
      MyProgressActions.getProgressLogCountRequested({
        patientUuid,
        filterType: this.state.filterType,
      }),
    )
  }

  renderItem(
    icon: string,
    color: string,
    text: string,
    subText: string,
    type = 'material',
  ) {
    return (
      <View style={styles.item}>
        <View style={styles.itemRight}>
          <Icon
            name={icon}
            color={color}
            containerStyle={styles.itemIcon}
            type={type}
          />
          <Text style={subText ? styles.itemTitle : {}}>{text}</Text>
        </View>
        <View style={styles.itemLeft}>
          <Text>{subText}</Text>
        </View>
      </View>
    )
  }

  render() {
    const { data, countLoading } = this.props
    const coachingCount = data?.[eventsKeys.coaching]?.[statusKeys?.done]
    const totals =
      (parseInt(data?.[eventsKeys.activity]?.[statusKeys?.done] ?? '0', 10) ??
        0) +
      (parseInt(data?.[eventsKeys.exercise]?.[statusKeys?.done] ?? '0', 10) ??
        0) +
      (parseInt(data?.[eventsKeys.nutrition]?.[statusKeys?.done] ?? '0', 10) ??
        0)

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={countLoading}
              onRefresh={() => this.getData()}
            />
          }
        >
          <Text style={styles.title}>{i18n.t('coaching')}</Text>
          {this.renderItem(
            'group',
            Color.roseTip,
            (coachingCount == 1) ?
              i18n.t('health.coachingSessionCompleted', {
                count: data?.[eventsKeys.coaching]?.[statusKeys?.done] ?? '0',
              })
              :
              i18n.t('health.coachingSessionIncomplete', {
                count: data?.[eventsKeys.coaching]?.[statusKeys?.done] ?? '0',
              })
              ,
            '',
          )}
          <View style={styles.row}>
            <Text style={[styles.title, styles.mt]}>
              {i18n.t('health.otherActivity')}
            </Text>
            <View style={styles.rowBtn}>
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      filterType: 'day',
                    },
                    () => {
                      this.getData()
                    },
                  )
                }}
              >
                <Text
                  style={[
                    styles.title,
                    styles.mt,
                    {
                      color:
                        this.state.filterType === 'day'
                          ? Color.slate
                          : Color.slateLight,
                    },
                  ]}
                >
                  {i18n.t('events.add.daily')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      filterType: 'week',
                    },
                    () => {
                      this.getData()
                    },
                  )
                }}
              >
                <Text
                  style={[
                    styles.weekly,
                    styles.title,
                    styles.mt,
                    {
                      color:
                        this.state.filterType === 'week'
                          ? Color.slate
                          : Color.slateLight,
                    },
                  ]}
                >
                  {i18n.t('events.add.weekly')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {this.renderItem(
            'dashboard',
            calendarConstants.eventsIcons.activity.color,
            i18n.t('health.total'),
            i18n.t(
              totals === 1
                ? 'health.totalActCompletedSingle'
                : 'health.totalActCompleted',
              { count: totals },
            ),
          )}
          {this.renderItem(
            calendarConstants.eventsIcons.activity.name,
            calendarConstants.eventsIcons.activity.color,
            i18n.t('activity'),
            i18n.t(
              data?.[eventsKeys.activity]?.[statusKeys?.done] === 1
                ? 'health.totalTodoCompletedSingle'
                : 'health.totalTodoCompleted',
              {
                count: data?.[eventsKeys.activity]?.[statusKeys?.done] ?? '0',
              },
            ),
            calendarConstants.eventsIcons.activity.type,
          )}
          {this.renderItem(
            calendarConstants.eventsIcons.exercise.name,
            calendarConstants.eventsIcons.exercise.color,
            i18n.t('exercise'),
            i18n.t(
              data?.[eventsKeys.exercise]?.[statusKeys?.done] === 1
                ? 'health.totalExerciseCompletedSingle'
                : 'health.totalExerciseCompleted',
              {
                count: data?.[eventsKeys.exercise]?.[statusKeys?.done] ?? '0',
              },
            ),
          )}
          {this.renderItem(
            calendarConstants.eventsIcons.nutrition.name,
            calendarConstants.eventsIcons.nutrition.color,
            i18n.t('nutrition'),
            i18n.t(
              data?.[eventsKeys.nutrition]?.[statusKeys?.done] === 1
                ? 'health.totalNutritionCompletedSingle'
                : 'health.totalNutritionCompleted',
              {
                count: data?.[eventsKeys.nutrition]?.[statusKeys?.done] ?? '0',
              },
            ),
          )}
        </ScrollView>
      </View>
    )
  }
}

function select(): any {
  return {}
}

export default compose<Props, any>(connect(select))(ActivityTabContent)

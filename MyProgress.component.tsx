import React, { Component } from 'react'

import { View, StatusBar, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import styles from './MyProgress.styles'
import { Action } from 'redux'
import { Icon, Text } from 'react-native-elements'
import i18n from 'ex-react-native-i18n'
import { Color } from 'constants/Color'
import { Actions as NavAction } from 'navigation/SagaNavigation'

import { ProgressTabs } from './components/Tabs/Tabs.component'
import { ActivityTabContent } from './components/TabContents/ActivityTabContent/ActivityTabContent.component'
import { HealthDataTabContent } from './components/TabContents/HealthDataTabContent/HealthDataTabContent.component'
import { findPatientSelf } from 'common-docdok/lib/domain/healthrelation/selectors/findPatient'
import { PatientDtoType } from 'common-docdok/lib/domain/healthrelation/types/patientDto'

interface Props {
  dispatch(action: Action): void
  navigation: any
  patient: any
  data: any
  countStats: any
  loading: boolean
  countLoading: boolean
}

export class MyProgress extends Component<Props> {
  state = {
    activeIndex: 0,
  }
  componentDidMount() {
    StatusBar.setHidden(false)
    StatusBar.setBarStyle('dark-content')
  }

  setTabIndex(activeIndex: number) {
    this.setState({ activeIndex })
  }

  render() {
    const {
      dispatch,
      patient,
      data,
      countStats,
      loading,
      countLoading,
    } = this.props
    console.log('__DEBUG__ countStats', countStats)

    return (
      <View>
        <View
          style={[
            styles.padder,
            styles.eventHeader,
            {
              backgroundColor: Color.slate,
            },
          ]}
        >
          <View style={styles.row}>
            <Icon
              name='stacked-line-chart'
              color={Color.white}
              containerStyle={{ marginLeft: 12 }}
            />
            <Text style={{ color: Color.white }}>
              {i18n.t('dashboard.box.stacked-line-chart.title')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(NavAction.push('addMyProgress', { isWeight: true }))
            }}
            style={[styles.fab]}
          >
            <Icon
              type='ionicon'
              name='add'
              color={Color.slate}
              iconStyle={{ fontWeight: 'bold' }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <ProgressTabs
            tabs={[
              {
                label: 'health.activity',
                index: 0,
              },
              {
                label: 'health.title',
                index: 1,
              },
            ]}
            activeIndex={this.state.activeIndex}
            onTabPress={index => this.setTabIndex(index)}
          />
          {this.state.activeIndex === 0 && (
            <ActivityTabContent
              dispatch={this.props.dispatch}
              patientUuid={patient?.uuid}
              data={countStats}
              countLoading={countLoading}
            />
          )}
          {this.state.activeIndex === 1 && (
            <HealthDataTabContent
              navigation={this.props.navigation}
              dispatch={this.props.dispatch}
              patientUuid={patient?.uuid}
              data={data}
              getLoading={loading}
            />
          )}
        </View>
      </View>
    )
  }
}

function select(state: any): any {
  const {
    login: { isLoggedIn },
    myProgressReducer: { data, loading, countStats, countLoading },
    healthrelationCache: { patients },
  }: any = state
  const patient: any = Object.values(patients as PatientDtoType[]).find(
    findPatientSelf,
  )
  return {
    isLoggedIn,
    data,
    patient,
    loading,
    countStats,
    countLoading,
  }
}

export default compose<Props, any>(connect(select))(MyProgress)

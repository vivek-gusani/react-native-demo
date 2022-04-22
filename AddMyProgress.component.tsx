import React, { Component } from 'react'

import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import styles from './MyProgress.styles'
import { Action } from 'redux'
import { Icon, Text } from 'react-native-elements'
import i18n from 'ex-react-native-i18n'
import { Color } from 'constants/Color'
import { ProgressTabs } from './components/Tabs/Tabs.component'
import { LogWeightTabContent } from './components/TabContents/LogWeightTabContent/LogWeightTabContent.component'
import { LogWHRTabContent } from './components/TabContents/LogWHRTabContent/LogWHRTabContent.component'
import { PatientDtoType } from 'common-docdok/lib/domain/healthrelation/types/patientDto'
import { findPatientSelf } from 'common-docdok/lib/domain/healthrelation/selectors/findPatient'
interface Props {
  dispatch(action: Action): void
  patient: any
  navigation: any
  addLoading: boolean
}

export class AddMyProgress extends Component<Props> {
  state = {
    activeIndex: 0,
  }
  componentDidMount() {
    StatusBar.setHidden(false)
    StatusBar.setBarStyle('dark-content')
    const { navigation } = this.props
    const isWeight = navigation.state?.params?.isWeight
    if (!isWeight) {
      this.setState({
        activeIndex: 1,
      })
    }
  }

  setTabIndex(activeIndex: number) {
    this.setState({ activeIndex })
  }

  render() {
    const { patient, addLoading, navigation } = this.props

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
        </View>
        <View style={styles.container}>
          <ProgressTabs
            tabs={[
              {
                label: 'health.log.weight',
                index: 0,
              },
              {
                label: 'health.log.whr',
                index: 1,
              },
            ]}
            activeIndex={this.state.activeIndex}
            onTabPress={index => {
              if (!navigation.state?.params?.record?.id) {
                this.setTabIndex(index)
              }
            }}
          />
          {this.state.activeIndex === 0 && (
            <LogWeightTabContent
              dispatch={this.props.dispatch}
              patientUuid={patient?.uuid}
              loading={addLoading}
              record={navigation.state?.params?.record}
            />
          )}
          {this.state.activeIndex === 1 && (
            <LogWHRTabContent
              dispatch={this.props.dispatch}
              patientUuid={patient?.uuid}
              loading={addLoading}
              record={navigation.state?.params?.record}
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
    myProgressReducer: { addLoading },
    healthrelationCache: { patients },
  }: any = state
  const patient: any = Object.values(patients as PatientDtoType[]).find(
    findPatientSelf,
  )
  return {
    isLoggedIn,
    addLoading,
    patient,
  }
}

export default compose<Props, any>(connect(select))(AddMyProgress)

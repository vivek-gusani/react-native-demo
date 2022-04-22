import React, { Component } from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'

import { connect } from 'react-redux'
import { compose } from 'recompose'
// @ts-ignore
import HighchartsReactNative from '@highcharts/highcharts-react-native'

import { Actions as NavAction } from 'navigation/SagaNavigation'

import { Icon, Text } from 'react-native-elements'
import i18n from 'ex-react-native-i18n'
import { Color } from 'constants/Color'
import { Action } from 'redux'

import styles from './HealthDataTabContent.styles'
import MyProgressActions from './../../../MyProgress.actions'
import { isArray } from 'lodash'
import moment from 'moment'

interface Props {
  navigation: any
  dispatch(action: Action): void
  patientUuid: string
  data: any
  getLoading: boolean
}

const filtersType = {
  three_months: 'three_months',
  six_months: 'six_months',
  year: 'year',
}

const monthsMap: any = {
  three_months: 2,
  six_months: 5,
  year: 11,
}
export class HealthDataTabContent extends Component<Props> {
  focusListner: any = null

  state = {
    filters: {
      weight: filtersType.three_months,
      whr: filtersType.three_months,
    },
    showLabel: {
      weight: {
        x: 0,
        y: 0,
      },
      whr: {
        x: 0,
        y: 0,
      },
    },
  }

  componentDidMount() {
    this.getData()
    this.focusListner = this.props.navigation.addListener('didFocus', () => {
      this.getData()
    })
  }

  componentWillUnmount() {
    if (this.focusListner) {
      this.focusListner?.remove()
    }
  }

  getData() {
    try {
      const locale = String(i18n.locale).slice(0, 2)
      moment.locale(['en', 'de'].includes(locale) ? locale : 'en')
    } catch (error) {
      console.log({ error })
    }
    const toDate = moment().endOf('month')
    const fromDate = moment(toDate)
      .subtract(monthsMap[this.state.filters.weight], 'months')
      .startOf('month')
    const { patientUuid, dispatch } = this.props

    dispatch(
      MyProgressActions.getProgressLogRequested({
        patientUuid,
        fromDate: fromDate.format(),
        toDate: toDate.format(),
      }),
    )
  }

  renderChart(data: any, type: 'weight' | 'whr') {
    const fromDate = moment()
      .subtract(monthsMap[this.state.filters.weight], 'months')
      .startOf('month')
      .toDate()
      .getTime()
    const chartData = [
      [fromDate, null],
      ...data.map((d: any) => [
        moment(d.date)
          .toDate()
          .getTime(),
        d?.[type] ?? 0,
      ]),
    ]

    const options = {
      title: '',
      chart: {
        type: 'line',
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 30 * 24 * 3600 * 1000,
      },
      yAxis: {
        min: type === 'weight' ? 40 : 0.1,
        title: {
          text: i18n.t(
            type === 'weight' ? 'surveys.graphic.weight' : 'health.whr',
          ),
        },
        tickInterval: type === 'weight' ? 5 : 0.1,
      },
      series: [
        {
          name: i18n.t(
            type === 'weight' ? 'surveys.graphic.weight' : 'health.whr',
          ),
          data: chartData,
          color: Color.roseTip,
          connectNulls: true,
        },
      ],
      credits: {
        enabled: false,
      },
    }
    return <HighchartsReactNative styles={{ height: 300 }} options={options} />
  }

  renderItem(value: any, record: any, isWeight = true) {
    const { dispatch } = this.props
    if (!value) {
      return null
    }
    return (
      <View style={styles.item} key={String(record.id)}>
        <View>
          <Text>{moment(record?.date).format('DD.MM.YYYY')}</Text>
          <Text style={styles.title}>
            {value} {i18n.t(isWeight ? 'health.kilo' : 'health.whr')}
          </Text>
        </View>
        <Icon
          name='edit'
          onPress={() => {
            dispatch(NavAction.push('addMyProgress', { record, isWeight }))
          }}
        />
      </View>
    )
  }

  renderFilterControls(key: 'weight' | 'whr') {
    return (
      <View>
        <View style={[styles.row, styles.filter]}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.setState(
                {
                  filters: {
                    ...this.state.filters,
                    [key]: filtersType.three_months,
                    weight: filtersType.three_months,
                  },
                },
                () => {
                  this.getData()
                },
              )
            }}
          >
            <Text
              style={[
                styles.titleBtn,
                {
                  fontWeight:
                    this.state.filters.weight === filtersType.three_months
                      ? '700'
                      : 'normal',
                },
              ]}
            >
              {i18n.t('health.months', { count: 3 })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.setState(
                {
                  filters: {
                    ...this.state.filters,
                    [key]: filtersType.six_months,
                    weight: filtersType.six_months,
                  },
                },
                () => {
                  this.getData()
                },
              )
            }}
          >
            <Text
              style={[
                styles.titleBtn,
                {
                  fontWeight:
                    this.state.filters.weight === filtersType.six_months
                      ? '700'
                      : 'normal',
                },
              ]}
            >
              {i18n.t('health.months', { count: 6 })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.setState(
                {
                  filters: {
                    ...this.state.filters,
                    [key]: filtersType.year,
                    weight: filtersType.year,
                  },
                },
                () => {
                  this.getData()
                },
              )
            }}
          >
            <Text
              style={[
                styles.titleBtn,
                {
                  fontWeight:
                    this.state.filters.weight === filtersType.year
                      ? '700'
                      : 'normal',
                },
              ]}
            >
              {i18n.t('health.year')}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={[styles.row, styles.datepicker]}>
          <Icon
            name='keyboard-arrow-left'
            color={Color.black}
            containerStyle={{ marginLeft: 12 }}
          />
          <Text>Jan-Sept 2021</Text>
          <Icon
            name='keyboard-arrow-right'
            color={Color.black}
            containerStyle={{ marginLeft: 12 }}
          />
        </View> */}
      </View>
    )
  }

  getDefaultXAxisLabel(key: 'weight' | 'whr') {
    const maps = new Map()
    const toDate = moment().endOf('month')
    if (this.state.filters[key] === filtersType.three_months) {
      maps.set(
        moment(toDate)
          .subtract(2, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(1, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(0, 'months')
          .format('MMM'),
        0,
      )
    }

    if (this.state.filters[key] === filtersType.six_months) {
      maps.set(
        moment(toDate)
          .subtract(5, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(4, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(3, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(2, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(1, 'months')
          .format('MMM'),
        0,
      )
      maps.set(moment(toDate).format('MMM'), 0)
    }
    if (this.state.filters[key] === filtersType.year) {
      maps.set(
        moment(toDate)
          .subtract(11, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(10, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(9, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(8, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(7, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(6, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(5, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(4, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(3, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(2, 'months')
          .format('MMM'),
        0,
      )
      maps.set(
        moment(toDate)
          .subtract(1, 'months')
          .format('MMM'),
        0,
      )
      maps.set(moment(toDate).format('MMM'), 0)
    }
    return maps
  }

  render() {
    const { data, getLoading } = this.props

    const dataArrGiven: any = isArray(data?.data) ? data?.data : []

    const weightData: any = dataArrGiven.filter((d: any) => d.weight !== 0)
    const whrData: any = dataArrGiven.filter((d: any) => d.whr !== 0)

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing={getLoading}
              onRefresh={() => this.getData()}
            />
          }
        >
          <Text style={styles.title}>{i18n.t('surveys.graphic.weight')}</Text>
          {this.renderFilterControls('weight')}
          {getLoading && <ActivityIndicator animating color={Color.roseTip} />}
          {!getLoading && weightData.length > 0 && (
            <View>{this.renderChart(weightData, 'weight')}</View>
          )}
          <View style={styles.list}>
            {!getLoading &&
              dataArrGiven.map((d: any) => {
                return this.renderItem(d.weight, d)
              })}
          </View>
          <Text style={styles.title}>{i18n.t('health.whr')}</Text>
          {this.renderFilterControls('whr')}
          {getLoading && <ActivityIndicator animating color={Color.roseTip} />}
          {!getLoading && whrData.length > 0 && (
            <View>{this.renderChart(whrData, 'whr')}</View>
          )}
          <View style={styles.list}>
            {!getLoading &&
              dataArrGiven.map((d: any) => {
                return this.renderItem(d.whr, d, false)
              })}
          </View>
        </ScrollView>
      </View>
    )
  }
}

function select(): any {
  return {}
}

export default compose<Props, any>(connect(select))(HealthDataTabContent)

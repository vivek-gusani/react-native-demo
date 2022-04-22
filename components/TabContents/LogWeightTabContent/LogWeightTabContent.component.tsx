import { Color } from 'constants/Color'
import i18n from 'ex-react-native-i18n'
import React, { Component } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { Actions as NavAction } from 'navigation/SagaNavigation'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Action } from 'redux'

import { AddProgressLog } from 'api/myProgress'
import moment from 'moment'

import ProgressTextInput from '../../common/TextInput/TextInput.component'

import styles from './LogWeightTabContent.styles'
import MyProgressActions from './../../../MyProgress.actions'

interface Props {
  dispatch(action: Action): void
  data?: any
  patientUuid: string
  loading: boolean
  record: any
}

export class LogWeightTabContent extends Component<Props> {
  state = {
    showDatePicker: false,
    showTimePicker: false,
  }

  validationSchema = Yup.object().shape({
    value: Yup.string().required(i18n.t('events.add.validation.required')),
    date: Yup.string().required(i18n.t('events.add.validation.required')),
    time: Yup.string().required(i18n.t('events.add.validation.required')),
  })

  doSubmitData(values: any, setSubmitting: any) {
    const { dispatch, patientUuid } = this.props
    const reqPayload: AddProgressLog = {
      ...values,
      patientUuid,
      date: moment(
        `${moment(values.date).format('YYYY-MM-DD')} ${moment(
          values.time,
        ).format('HH:mm:ss')}`,
      ).format('YYYY-MM-DDTHH:mm:ssZ'),
      height: 0,
      hip: 0,
      waist: 0,
      weight: values.value,
      id: values?.id,
      cb: () => {
        setSubmitting(false)
        dispatch(NavAction.pop())
      },
    }

    if (reqPayload.whr === null) {
      reqPayload.whr = 0
    }
    console.log({ reqPayload })
    dispatch(MyProgressActions.addProgressLogRequested(reqPayload))
  }

  render() {
    const { loading, record } = this.props
    return (
      <View style={styles.container}>
        <Formik
          validationSchema={this.validationSchema}
          initialValues={{
            ...record,
            date: record?.date ? new Date(record?.date) : new Date(),
            time: record?.date ? new Date(record?.date) : new Date(),
            value: record?.weight ?? '',
            id: record?.id,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true)
            this.doSubmitData(values, setSubmitting)
          }}
        >
          {({ values, errors, setFieldValue, handleSubmit, dirty }) => {
            console.log({ values })
            return (
              <ScrollView
                contentContainerStyle={{ paddingBottom: 200 }}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.row}>
                  <ProgressTextInput
                    label={i18n.t('health.log.date')}
                    onChangeText={(text: string) => {
                      this.setState(
                        {
                          showDatePicker: false,
                          showTimePicker: false,
                        },
                        () => {
                          setFieldValue('date', text)
                        },
                      )
                    }}
                    value={values?.date}
                    type='date'
                    setShowDatePicker={() => {
                      this.setState({
                        showDatePicker: true,
                      })
                    }}
                    showDatePicker={this.state.showDatePicker}
                    error={errors.date}
                  />
                  <ProgressTextInput
                    label={i18n.t('health.log.time')}
                    onChangeText={(text: string) => {
                      this.setState(
                        {
                          showDatePicker: false,
                          showTimePicker: false,
                        },
                        () => {
                          setFieldValue('time', text)
                        },
                      )
                    }}
                    value={values?.time}
                    type='time'
                    setShowDatePicker={() => {
                      this.setState({
                        showTimePicker: true,
                      })
                    }}
                    showTimePicker={this.state.showTimePicker}
                    error={errors.time}
                  />
                  <ProgressTextInput
                    label={i18n.t('health.log.weightText')}
                    onChangeText={(text: string) =>
                      setFieldValue('value', text)
                    }
                    value={values?.value}
                    type='number'
                    error={errors.value}
                  />
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('./../../../../../assets/images/logweight.png')}
                    resizeMode='contain'
                  />
                </View>
                <View>
                  <Text style={styles.note}>
                    {i18n.t('health.log.weightNote')}
                  </Text>
                </View>
                <View style={styles.rowCenter}>
                  <Button
                    buttonStyle={[
                      styles.saveBtn,
                      {
                        backgroundColor: Color.slate,
                      },
                    ]}
                    title={i18n.t('global.cancel')}
                    onPress={() => {
                      this.props.dispatch(NavAction.pop())
                    }}
                  />

                  <Button
                    disabled={!dirty}
                    buttonStyle={[styles.saveBtn]}
                    title={i18n.t(
                      loading ? 'events.add.loading' : 'events.add.save',
                    )}
                    onPress={handleSubmit}
                  />
                </View>
              </ScrollView>
            )
          }}
        </Formik>
      </View>
    )
  }
}

function select(): any {
  return {}
}

export default compose<Props, any>(connect(select))(LogWeightTabContent)

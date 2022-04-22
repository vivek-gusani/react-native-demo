import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './TextInput.styles'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

function ProgressTextInput(props: any) {
  console.log('props?.value ', props?.value)
  return (
    <View style={styles.container}>
      <Text>{props?.label}</Text>
      <View style={styles.inputContainer}>
        {props.type === 'number' ? (
          <TextInput
            keyboardType={'numeric'}
            style={styles.input}
            defaultValue={props?.value}
            value={String(props?.value)}
            onChangeText={(text: string) =>
              props.type === 'number' ? props?.onChangeText(text) : null
            }
          />
        ) : (
          <TouchableOpacity
            style={styles.input}
            onPress={() => props.setShowDatePicker()}
          >
            <Text>
              {moment(props.value).format(
                props.type === 'date' ? 'DD.MM.YY' : 'HH:mm',
              )}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {props.error ? <Text style={styles.error}>{props.error}</Text> : null}

      {props.showDatePicker && (
        <DateTimePicker
          maximumDate={new Date()}
          testID='dateTimePicker'
          value={props.value ? new Date(props.value) : new Date()}
          mode={props.type}
          is24Hour={true}
          display='default'
          onChange={(_: any, changedDate: any) => {
            props?.onChangeText(changedDate ?? new Date())
          }}
        />
      )}
      {props.showTimePicker && (
        <DateTimePicker
          testID='dateTimePicker'
          value={props.value ? new Date(props.value) : new Date()}
          mode={props.type}
          is24Hour={true}
          display='default'
          onChange={(_: any, changedDate: any) => {
            props?.onChangeText(changedDate ?? new Date())
          }}
        />
      )}
    </View>
  )
}

export default ProgressTextInput

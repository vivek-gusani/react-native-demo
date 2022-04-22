import i18n from 'ex-react-native-i18n'
import React, { Component } from 'react'

import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import styles from './Tabs.styles'
interface Props {
  activeIndex: number
  onTabPress(index: number): void
  tabs: any[]
}

export class ProgressTabs extends Component<Props> {
  render() {
    return (
      <View style={styles.row}>
        {this.props.tabs.map(tab => {
          return (
            <TouchableOpacity
              style={styles.tab}
              onPress={() => this.props.onTabPress(tab.index)}
            >
              <Text
                style={[
                  styles.tabText,
                  this.props.activeIndex !== tab.index
                    ? styles.tabTextInactive
                    : {},
                ]}
              >
                {i18n.t(tab.label)}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

function select(): any {
  return {}
}

export default compose<Props, any>(connect(select))(ProgressTabs)

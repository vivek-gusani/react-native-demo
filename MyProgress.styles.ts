import { Dimensions, StyleSheet } from 'react-native'

import { Layout } from 'constants/Layout'
import { Color } from 'constants/Color'

export const ICON_SIZE_SMALL: number = Layout.window.height * 0.03
export const ICON_SIZE: number = Layout.window.height * 0.05
export const ICON_SIZE_LARGE: number = Layout.window.height * 0.09
export const TITLE_SIZE: number = 15

export default StyleSheet.create({
  container: {
    marginTop: 18,
    height: Dimensions.get('window').height - 120,
  },
  text: {
    marginVertical: 18,
    fontSize: 18,
  },
  eventHeader: {
    marginTop: -8,
    height: 86,
  },
  padder: {
    padding: 12,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
  fab: {
    elevation: 5,
    position: 'absolute',
    top: 48,
    left: 24,
    height: 60,
    width: 60,
    backgroundColor: Color.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      width: StyleSheet.hairlineWidth,
      height: StyleSheet.hairlineWidth,
    },
  },
})

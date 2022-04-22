import { StyleSheet } from 'react-native'

import { Layout } from 'constants/Layout'
import { Color } from 'constants/Color'

export const ICON_SIZE_SMALL: number = Layout.window.height * 0.03
export const ICON_SIZE: number = Layout.window.height * 0.05
export const ICON_SIZE_LARGE: number = Layout.window.height * 0.09
export const TITLE_SIZE: number = 15

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18,
    borderBottomColor: Color.slateLight,
    borderBottomWidth: 1,
  },
  tab: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  tabText: {
    color: Color.slate,
    fontWeight: '700',
    fontSize: 18,
  },
  tabTextInactive: {
    color: Color.slateLight,
  },
})

import { Color } from 'constants/Color'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    marginHorizontal: 18,
    paddingVertical: 18,
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 18,
    borderBottomColor: Color.slateLight,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  itemRight: {
    flexDirection: 'row',
  },
  itemLeft: {
    width: '60%',
    // alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  itemIcon: {
    marginRight: 12,
  },
  mt: {
    marginTop: 18,
  },
  weekly: {
    marginLeft: 8,
  },
  itemTitle: {
    fontSize: 18,
  },
})

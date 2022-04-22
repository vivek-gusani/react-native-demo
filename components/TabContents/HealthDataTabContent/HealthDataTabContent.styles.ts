import { Color } from 'constants/Color'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    marginHorizontal: 18,
    paddingVertical: 18,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  list: {
    marginTop: 12,
    marginBottom: 18,
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
  scroll: {
    paddingBottom: 120,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  titleBtn: {
    fontSize: 14,
    textAlign: 'center',
  },
  filter: {
    marginVertical: 12,
  },
  datepicker: {
    marginBottom: 12,
  },
})

import { Color } from 'constants/Color'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    marginHorizontal: 18,
    paddingVertical: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 60,
  },
  note: {
    textAlign: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    marginTop: 32,
  },
  saveBtn: {
    backgroundColor: Color.bluePrimary,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
})

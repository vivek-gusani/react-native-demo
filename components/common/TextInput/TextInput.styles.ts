import { Color } from 'constants/Color'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 60,
  },
  inputContainer: {
    backgroundColor: Color.slateLighter,
    marginRight: 4,
  },
  input: {
    backgroundColor: Color.slateLighter,
    color: Color.slate,
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  error: {
    color: Color.errorBackground,
    marginRight: 4,
  },
})

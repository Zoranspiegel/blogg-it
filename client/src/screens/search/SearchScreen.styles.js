import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#020123'
  },
  inputGradient: {
    marginVertical: 20,
    minHeight: 46,
    borderRadius: 18,    
  },
  inputContainer: {
    flex: 1,
    width: width * 0.9,
    backgroundColor: '#020123',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 18,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 3,
    paddingHorizontal: 10,
  },
  textInput: {
    width: '80%',
    color: '#f5f5f5',
    fontSize: 16
  },
  sortBtnsContainer: {
    borderTopColor: '#102962',
    borderTopWidth: 2,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width,
    gap: 12,
    marginBottom: 10,
  },
  sortBtn: {
    paddingHorizontal: 17,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: '#007764',
  },
  sortBtnActive: {
    paddingHorizontal: 17,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: '#37b4a1',
  },
  sortBtnText: {
    color: '#020123',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noResults: {
    color: '#f5f5f5',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default styles;

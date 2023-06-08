import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './src/routes/AppNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
        <StatusBar translucent={false} style={'light'}/>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

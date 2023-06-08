import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/account/AccountScreen';
import FavoritesScreen from '../screens/favorites/FavoritesScreen';

const Stack = createNativeStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='accountStack'
        component={AccountScreen}
        options={{
          headerTintColor: '#f5f5f5',
          headerStyle: {backgroundColor: '#020123'},
          title: 'Perfil'
        }}
      />
      <Stack.Screen
        name='favoritesStack'
        component={FavoritesScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;

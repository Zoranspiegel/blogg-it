import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SavedScreen from "../screens/saved/SavedScreen";
import CollectionScreen from "../screens/saved/collection/CollectionScreen";

const Stack = createNativeStackNavigator();

const SavedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Guardados"
        component={SavedScreen}
        options={{
          headerStyle: { backgroundColor: '#020123' },
          headerTintColor: '#f5f5f5'
        }}
      />
      <Stack.Screen
        name="Collection"
        component={CollectionScreen}
        options={{
          headerStyle: { backgroundColor: '#020123' },
          headerTintColor: '#f5f5f5'
        }}
      />
    </Stack.Navigator>
  );
};

export default SavedStack;

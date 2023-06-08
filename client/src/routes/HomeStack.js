import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import ArticleScreen from "../screens/article/ArticleScreen";
import ArticleHeader from "../component/article/ArticleHeader";
import CommentsScreen from "../screens/article/comments/CommentsScreen";
import AccountStack from "./AccountStack";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="article"
        component={ArticleScreen}
        options={{
          headerTitle: () => null,
          headerLeft: () => <ArticleHeader />,
          headerStyle: { backgroundColor: '#090841' },
        }}
      />
      <Stack.Screen
        name="comments"
        component={CommentsScreen}
        options={{
          title: 'Comentarios',
          headerTintColor: '#f5f5f5',
          headerTitleStyle: { fontSize: 20 },
          headerStyle: { backgroundColor: '#020123' },
        }}
      />
      <Stack.Screen
        name="account"
        component={AccountStack}
        options={{
          title: 'Log In',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

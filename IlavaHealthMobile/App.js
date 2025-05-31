import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import BuyerDashboardScreen from './BuyerDashboardScreen';
import FarmerDashboardScreen from './FarmerDashboardScreen';
import CategoriesScreen from './CategoriesScreen';
import CartScreen from './CartScreen';
import FavoritesScreen from './FavoritesScreen';
import ProfileScreen from './ProfileScreen';
import SellWasteScreen from './SellWasteScreen';
import MyOrdersScreen from './MyOrdersScreen';
import NotFoundScreen from './NotFoundScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userType, setUserType] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash">
          {props => (
            <SplashScreen {...props} onUserTypeSelect={type => {
              setUserType(type);
              props.navigation.replace('Login', { userType: type });
            }} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {props => (
            <LoginScreen
              {...props}
              userType={props.route.params?.userType || userType}
              onBack={() => props.navigation.replace('Splash')}
              onLoginSuccess={type => {
                if (type === 'farmer') props.navigation.replace('FarmerDashboard');
                else props.navigation.replace('BuyerDashboard');
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BuyerDashboard" component={BuyerDashboardScreen} />
        <Stack.Screen name="FarmerDashboard" component={FarmerDashboardScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SellWaste" component={SellWasteScreen} />
        <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

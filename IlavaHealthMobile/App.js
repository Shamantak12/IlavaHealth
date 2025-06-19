import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { ThemeProvider } from './ThemeContext';
import SplashScreen from './SplashScreen';
import OnboardingScreen from './OnboardingScreen';
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
import ProductDetailScreen from './ProductDetailScreen';
import SellFreshScreen from './SellFreshScreen';
import AnalyticsScreen from './AnalyticsScreen';
import InventoryScreen from './InventoryScreen';
import SupportScreen from './SupportScreen';
import SettingsScreen from './SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userType, setUserType] = useState(null);

  return (
    <ThemeProvider>
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
          <Stack.Screen name="Onboarding">
            {props => (
              <OnboardingScreen {...props} onComplete={(userType) => {
                setUserType(userType);
                props.navigation.replace('Login', { userType });
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
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="SellFresh" component={SellFreshScreen} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

// Register the App component for Expo Snack compatibility
registerRootComponent(App);

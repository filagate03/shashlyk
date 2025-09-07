import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Existing screens (these would be implemented fully in a real app)
const HomeScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Шашлык-Машлык</Text>
    <Text style={styles.subtitle}>Восточные деликатесы с домашним уютом</Text>
    <Text>Главная страница - каталог блюд</Text>
  </View>
);

const MenuScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Меню</Text>
    <Text>Каталог блюд с фильтрами и сортировкой</Text>
  </View>
);

const CartScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Корзина</Text>
    <Text>Корзина с выбранными блюдами</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Профиль</Text>
    <Text>Профиль пользователя, история заказов, настройки</Text>
  </View>
);

const OrderTrackingScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Отслеживание заказа</Text>
    <Text>Отслеживание статуса заказа в реальном времени</Text>
  </View>
);

// Navigation setup
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Loading screen while checking auth state
const AuthLoadingScreen = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#D32F2F" />
    <Text style={styles.loadingText}>Загрузка...</Text>
  </View>
);

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Menu') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D32F2F',
        tabBarInactiveTintColor: '#424242',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FAFAFA',
          borderTopWidth: 1,
          borderTopColor: '#F5F5F5',
        },
      })}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Главная',
        }} 
      />
      <Tab.Screen 
        name="Menu" 
        component={MenuScreen} 
        options={{ 
          title: 'Меню',
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ 
          title: 'Корзина',
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          title: 'Профиль',
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate checking auth state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "HomeTabs" : "Login"}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#D32F2F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ 
                title: 'Вход',
              }} 
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{ 
                title: 'Регистрация',
              }} 
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="HomeTabs" 
              component={HomeTabs} 
              options={{ 
                title: 'Шашлык-Машлык',
                headerShown: false
              }} 
            />
            <Stack.Screen 
              name="OrderTracking" 
              component={OrderTrackingScreen} 
              options={{ 
                title: 'Отслеживание заказа'
              }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 20,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#424242',
  },
});
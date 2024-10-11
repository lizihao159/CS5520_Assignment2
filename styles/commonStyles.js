import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6D6E0', // light purple background
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4C3D99',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#333',
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: '#3A2A80',
    borderTopWidth: 0,
    elevation: 0,
  },
  headerBackgroundColor: '#3A2A80',
  headerTintColor: '#FFFFFF',
  tabBarActiveTintColor: '#FFD700',
  tabBarInactiveTintColor: '#FFFFFF',
});

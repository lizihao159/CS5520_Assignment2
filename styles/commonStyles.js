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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4C3D99', // Darker purple for the card background
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Elevation for Android
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Helvetica',
  },
  cardDate: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    color: '#FFD700', // Yellow color for the warning icon
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4C3D99',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF', // White background for input box
    color: '#333',
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 16,
    textAlign: 'right',
    marginRight: 20,
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: '#3A2A80', // Purple for the bottom tab background
    borderTopWidth: 0,
    elevation: 0,
  },
  headerBackgroundColor: '#3A2A80', // Purple for header background
  headerTintColor: '#FFFFFF', // White for header text
  tabBarActiveTintColor: '#FFD700', // Yellow for active tab icon
  tabBarInactiveTintColor: '#FFFFFF', // White for inactive tab icon
  tabBarLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
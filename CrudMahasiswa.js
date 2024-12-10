import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPen, faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons'; // Ensure icons are properly imported
import Createdata from './Createdata';
import Listdata from './Listdata';
import EditData from './EditData'; // Import the EditData component

function HomeScreen() {
  return <Createdata />;
}

function SettingsScreen() {
  return <Listdata />;
}

function EditdataScreen() {
  return <EditData />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Tab for adding data */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faPlusCircle} color={color} size={20} />
            ),
          }}
        />
        {/* Tab for listing data */}
        <Tab.Screen
          name="Data Mahasiswa"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserPen} color={color} size={20} />
            ),
          }}
        />
        {/* Tab for editing data */}
        <Tab.Screen
          name="Edit"
          component={EditdataScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faEdit} color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
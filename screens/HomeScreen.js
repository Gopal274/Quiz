// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Quiz App</Text>
      <Button title="Take a Quiz" onPress={() => navigation.navigate('Quiz')} />
      <Button title="Admin Panel" onPress={() => navigation.navigate('Admin')} />
    </View>
  );
};

export default HomeScreen;
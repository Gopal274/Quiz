// screens/AdminScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminScreen = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]);
  const [optionText, setOptionText] = useState('');
  const [image, setImage] = useState(null);

  const addQuestion = () => {
    // Add the question with text, options, and image
    setQuestions([...questions, { question: questionText, options, image }]);
    setQuestionText('');
    setOptions([]);
    setImage(null);
  };

  const addOption = () => {
    // Add an option to the current question
    setOptions([...options, optionText]);
    setOptionText('');
  };

  const pickImage = async () => {
    // Open image picker to select an image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const saveQuiz = async () => {
    // Save the quiz to local storage
    const newQuiz = { title, questions };
    const storedQuizzes = await AsyncStorage.getItem('quizzes');
    const quizzes = storedQuizzes ? JSON.parse(storedQuizzes) : [];
    quizzes.push(newQuiz);
    await AsyncStorage.setItem('quizzes', JSON.stringify(quizzes));
    setTitle('');
    setQuestions([]);
  };

  return (
    <View>
      <Text>Create a New Quiz</Text>
      <TextInput
        placeholder="Quiz Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Question"
        value={questionText}
        onChangeText={setQuestionText}
      />
      <TextInput
        placeholder="Option"
        value={optionText}
        onChangeText={setOptionText}
      />
      <Button title="Add Option" onPress={addOption} />
      <Button title="Pick an image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Add Question" onPress={addQuestion} />
      <Button title="Save Quiz" onPress={saveQuiz} />
    </View>
  );
};

export default AdminScreen;
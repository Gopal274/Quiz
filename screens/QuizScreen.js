// screens/QuizScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizScreen = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const storedQuizzes = await AsyncStorage.getItem('quizzes');
      if (storedQuizzes) {
        const quizzes = JSON.parse(storedQuizzes);
        setQuizzes(quizzes);
        setCurrentQuiz(quizzes[0]);
      }
    };
    fetchQuizzes();
  }, []);

  const nextQuestion = () => {
    // Navigate to the next question
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    // Navigate to the previous question
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitQuiz = () => {
    // Calculate and display the quiz results
    let correctAnswers = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === 0) correctAnswers++;
    }
    alert(`You got ${correctAnswers} out of ${currentQuiz.questions.length} correct!`);
  };

  if (!currentQuiz) return <Text>Loading...</Text>;

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <View>
      <Text>{currentQuiz.title}</Text>
      <Text>{currentQuestion.question}</Text>
      {currentQuestion.image && <Image source={{ uri: currentQuestion.image }} style={{ width: 200, height: 200 }} />}
      {currentQuestion.options.map((option, index) => (
        <Button key={index} title={option} onPress={() => setAnswers([...answers, index])} />
      ))}
      {currentQuestionIndex > 0 && <Button title="Previous" onPress={previousQuestion} />}
      {currentQuestionIndex < currentQuiz.questions.length - 1 && <Button title="Next" onPress={nextQuestion} />}
      {currentQuestionIndex === currentQuiz.questions.length - 1 && <Button title="Submit" onPress={submitQuiz} />}
    </View>
  );
};

export default QuizScreen;
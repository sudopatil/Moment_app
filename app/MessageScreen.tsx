import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { usePhotoContext } from '@/context/PhotoContext';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

export default function MessageScreen() {
  const { photos, message, setMessage } = usePhotoContext();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMemory = async () => {
    if (photos.length === 0) return;
    
    setIsGenerating(true);
    router.push('/PdfScreen');
    setIsGenerating(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Personal Message</Text>
      <Text style={styles.subtitle}>Your message will be included in the memory PDF</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Write something about this moment..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={5}
          maxLength={200}
        />
        <Text style={styles.charCount}>{message.length}/200 characters</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.generateButton}
        onPress={handleGenerateMemory}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <MaterialIcons name="loop" size={24} color="white" />
        ) : (
          <>
            <Text style={styles.generateButtonText}>Generate Memory PDF</Text>
            <MaterialIcons name="picture-as-pdf" size={24} color="white" />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 10,
    padding: 15,
    minHeight: 150,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 15,
  },
  charCount: {
    color: '#888',
    textAlign: 'right',
    fontSize: 14,
  },
  generateButton: {
    backgroundColor: '#6a1b9a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 30,
    gap: 12,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
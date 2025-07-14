import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { usePhotoContext } from '@/context/PhotoContext';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

export default function PreviewScreen() {
  const { photos, clearPhotos } = usePhotoContext();
  const [applyingFilter, setApplyingFilter] = useState(false);

  const handleGenerateMemory = () => {
    router.push('/MessageScreen');
  };

  const handleRetakeAll = () => {
    clearPhotos();
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preview Your Memory</Text>
      <Text style={styles.subtitle}>Add a message or generate your memory PDF</Text>
      
      <ScrollView contentContainerStyle={styles.photosContainer}>
        {photos.map((uri: any, index: number) => (
          <View key={index} style={styles.photoContainer}>
            <Image 
              source={{ uri }} 
              style={styles.photo} 
            />
            <View style={styles.photoNumber}>
              <Text style={styles.photoNumberText}>{index + 1}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.retakeButton} onPress={handleRetakeAll}>
          <MaterialIcons name="replay" size={24} color="white" />
          <Text style={styles.buttonText}>Retake All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.continueButton} onPress={handleGenerateMemory}>
          <Text style={styles.buttonText}>Continue</Text>
          <MaterialIcons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
    marginBottom: 30,
  },
  photosContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  photoContainer: {
    marginBottom: 25,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#6a1b9a',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: 300,
  },
  photoNumber: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(106, 27, 154, 0.8)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  retakeButton: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    gap: 10,
  },
  continueButton: {
    backgroundColor: '#6a1b9a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
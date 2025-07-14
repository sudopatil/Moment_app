
import { useState, useRef } from 'react';
import { CameraType, CameraView } from 'expo-camera';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { usePhotoContext } from '@/context/PhotoContext';
import { router } from 'expo-router';
import React from 'react';

export default function CameraScreen() {
  const { photos, addPhoto, removePhoto } = usePhotoContext();
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView>(null);

  const toggleCameraFacing = () => {
    setFacing((current: string) => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current && photos.length < 5) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo && photo.uri) {
        addPhoto(photo.uri);
      }
    }
  };

  const handleRetake = (index: number) => {
    removePhoto(index);
  };

  const goToPreview = () => {
    router.push('/PreviewScreen');
  };

  return (
    <View style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.header}>
          <Text style={styles.appTitle}>Moment App</Text>
          <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
            <MaterialIcons name="flip-camera-ios" size={28} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <AntDesign name="close" size={28} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
            <View style={styles.shutterInner} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={goToPreview}
            disabled={photos.length === 0}
          >
            <MaterialIcons 
              name="preview" 
              size={28} 
              color={photos.length > 0 ? "white" : "#555"} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {photos.length} / 5 photos
          </Text>
        </View>
      </CameraView>
      
      {photos.length > 0 && (
        <View style={styles.photoPreviewContainer}>
          {photos.map((uri: any, index: number) => (
            <TouchableOpacity 
              key={index} 
              style={styles.previewItem}
              onPress={() => handleRetake(index)}
            >
              <Image source={{ uri }} style={styles.previewImage} />
              <View style={styles.retakeBadge}>
                <AntDesign name="close" size={12} color="white" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  shutterButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#6a1b9a',
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6a1b9a',
  },
  counter: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  counterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  photoPreviewContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    gap: 10,
  },
  previewItem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  retakeBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(255,0,0,0.7)',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
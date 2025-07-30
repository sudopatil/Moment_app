import { usePhotoContext } from '@/context/PhotoContext';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { CameraType, CameraView, FlashMode, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';

export default function CameraScreen() {
  const { width, height } = useWindowDimensions();
  const { photos, addPhoto, removePhoto } = usePhotoContext();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      // Request camera permissions
      if (permission && !permission.granted && permission.canAskAgain) {
        await requestPermission();
      }
      
      // Request media library permissions
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (galleryStatus.status !== 'granted') {
        alert('Sorry, we need gallery permissions to make this work!');
      }
    })();
  }, []);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(current => {
      if (current === 'off') return 'on';
      if (current === 'on') return 'auto';
      return 'off';
    });
  };

  const takePicture = async () => {
    if (!permission?.granted) return;
    
    if (cameraRef.current && photos.length < 5) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo && photo.uri) {
        addPhoto(photo.uri);
      }
    } else if (photos.length >= 5) {
      alert('You can only add up to 5 photos');
    }
  };

  const pickImages = async () => {
    console.log('[DEBUG] Starting image picker');
    console.log(`[DEBUG] Current photos count: ${photos.length}`);
    
    if (photos.length >= 5) {
      console.log('[DEBUG] Photo limit reached, blocking selection');
      alert('You already have 5 photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5 - photos.length,
      quality: 1,
    });

    //console.log('[DEBUG] Image picker result:', result);

    if (!result.canceled && result.assets) {
      //console.log(`[DEBUG] Received ${result.assets.length} assets`);
      
      // Extract URIs from assets
      const newUris = result.assets.map(asset => asset.uri);
     // console.log(`[DEBUG] Adding new URIs: ${newUris}`);
      
      // Add each new URI individually
      newUris.forEach(uri => addPhoto(uri));
    } else {
      console.log('[DEBUG] User canceled image selection');
    }
  };

  const handleRetake = (index: number) => {
    removePhoto(index);
  };

  const goToPreview = () => {
    router.push('/PreviewScreen');
  };

  if (!permission) {
    return <View style={styles.permissionContent} />;
  }

  if (!permission.granted) {
    return (
      <ImageBackground 
        source={require('../../assets/images/moment_background.jpg')}
        style={[styles.container, { width, height }]}
        resizeMode="cover"
      >
        <View style={styles.overlay} pointerEvents="none" />
        <StatusBar barStyle="light-content" />
        
        <View style={styles.permissionContent}>
          <Text style={styles.permissionText}>
            {permission.canAskAgain
              ? "We need access to your camera"
              : "Camera permission denied. Enable it in settings"
          }</Text>
          
          {permission.canAskAgain && (
            <TouchableOpacity 
              style={styles.permissionButton} 
              onPress={requestPermission}
            >
              <Text style={styles.permissionButtonText}>Allow Camera Access</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={require('../../assets/images/moment_background.jpg')}
      style={[styles.container, { width, height }]}
      resizeMode="cover"
    >
      <View style={styles.overlay} pointerEvents="none" />
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.flashButton}
          onPress={toggleFlash}
        >
          <MaterialIcons 
            name={flash === 'off' ? 'flash-off' : flash === 'on' ? 'flash-on' : 'flash-auto'} 
            size={28} 
            color="rgba(255,255,255,0.9)" 
          />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>MOMENT</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.flipButton}
          onPress={toggleCameraFacing}
        >
          <MaterialIcons name="flip-camera-ios" size={28} color="rgba(255,255,255,0.9)" />
        </TouchableOpacity>
      </View>

      {/* Camera Preview */}
      <View style={styles.cameraContainer}>
        <CameraView 
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          flash={flash}
        >
          {/* Fixed grid overlay for camera */}
          <View style={styles.gridContainer}>
            <View style={styles.horizontalLine1} />
            <View style={styles.horizontalLine2} />
            <View style={styles.verticalLine1} />
            <View style={styles.verticalLine2} />
          </View>
        </CameraView>
      </View>

      {/* Camera Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.galleryButton}
          onPress={pickImages}
        >
          <MaterialIcons name="photo-library" size={28} color="rgba(255,255,255,0.9)" />
          <Text style={styles.galleryButtonText}>Upload</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.shutterButton} 
          onPress={takePicture}
          activeOpacity={0.8}
        >
          <View style={styles.shutterInner} />
          <View style={styles.decorativeRing} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.previewButton}
          onPress={goToPreview}
          disabled={photos.length === 0}
        >
          <MaterialIcons 
            name="arrow-forward" 
            size={28} 
            color={photos.length > 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"} 
          />
        </TouchableOpacity>
      </View>

      {/* Photo Previews */}
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 10,
  },
  titleContainer: {
    alignItems: 'center',
  },
  appTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 3,
    fontFamily: 'serif',
  },
  flashButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  camera: {
    width: '100%',
    aspectRatio: 3/4,
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  horizontalLine1: {
    position: 'absolute',
    top: '33%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  horizontalLine2: {
    position: 'absolute',
    top: '66%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  verticalLine1: {
    position: 'absolute',
    left: '33%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  verticalLine2: {
    position: 'absolute',
    left: '66%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingBottom: 50,
    paddingTop: 30,
  },
  galleryButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButtonText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  previewButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shutterButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(245,245,220,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(139,69,19,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(139,69,19,0.7)',
  },
  decorativeRing: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    pointerEvents: 'none',
  },
  photoPreviewContainer: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    flexDirection: 'row',
    gap: 10,
  },
  previewItem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
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
  permissionContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 20,
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'serif',
    letterSpacing: 1,
  },
  permissionButton: {
    backgroundColor: 'rgba(139,69,19,0.7)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
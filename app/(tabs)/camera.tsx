// import { usePhotoContext } from '@/context/PhotoContext';
// import { AntDesign, MaterialIcons } from '@expo/vector-icons';
// import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
// import { router } from 'expo-router';
// import React, { useEffect, useRef, useState } from 'react';
// import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

// export default function CameraScreen() {
//   const { width, height } = useWindowDimensions();
//   const { photos, addPhoto, removePhoto } = usePhotoContext();
//   const [facing, setFacing] = useState<CameraType>('back');
//   const cameraRef = useRef<CameraView>(null);
//   const [permission, requestPermission] = useCameraPermissions();

//   useEffect(() => {
//     if (permission && !permission.granted && permission.canAskAgain) {
//       (async () => {
//         await requestPermission();
//       })();
//     }
//   }, [permission]);

//   const toggleCameraFacing = () => {
//     setFacing((current) => (current === 'back' ? 'front' : 'back'));
//   };

//   const takePicture = async () => {
//     if (!permission?.granted) return;
    
//     if (cameraRef.current && photos.length < 5) {
//       const photo = await cameraRef.current.takePictureAsync();
//       if (photo && photo.uri) {
//         addPhoto(photo.uri);
//       }
//     }
//   };

//   const handleRetake = (index: number) => {
//     removePhoto(index);
//   };

//   const goToPreview = () => {
//     router.push('/PreviewScreen');
//   };

//   if (!permission) {
//     return <View style={styles.permissionContent} />;
//   }

//   if (!permission.granted) {
//     return (
//       <ImageBackground 
//         source={require('../../assets/images/moment_background.jpg')}
//         style={[styles.container, { width, height }]}
//         resizeMode="cover"
//       >
//         <View style={styles.overlay} pointerEvents="none" />
//         <StatusBar barStyle="light-content" />
        
//         <View style={styles.permissionContent}>
//           <Text style={styles.permissionText}>
//             {permission.canAskAgain
//               ? "We need access to your camera"
//               : "Camera permission denied. Enable it in settings"
//           }</Text>
          
//           {permission.canAskAgain && (
//             <TouchableOpacity 
//               style={styles.permissionButton} 
//               onPress={requestPermission}
//             >
//               <Text style={styles.permissionButtonText}>Allow Camera Access</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </ImageBackground>
//     );
//   }

//   return (
//     <ImageBackground 
//       source={require('../../assets/images/moment_background.jpg')}
//       style={[styles.container, { width, height }]}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay} pointerEvents="none" />
//       <StatusBar barStyle="light-content" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.titleContainer}>
//           <Text style={styles.appTitle}>MOMENT</Text>
//         </View>
        
//         <TouchableOpacity 
//           style={styles.flipButton}
//           onPress={toggleCameraFacing}
//         >
//           <MaterialIcons name="flip-camera-ios" size={28} color="rgba(255,255,255,0.9)" />
//         </TouchableOpacity>
//       </View>

//       {/* Camera Preview */}
//       <View style={styles.cameraContainer}>
//         <CameraView 
//           ref={cameraRef}
//           style={styles.camera}
//           facing={facing}
//         >
//           {/* Frame overlay for camera */}
//           <View style={styles.cameraFrame}>
//             <View style={styles.frameCornerTopLeft} />
//             <View style={styles.frameCornerTopRight} />
//             <View style={styles.frameCornerBottomLeft} />
//             <View style={styles.frameCornerBottomRight} />
//           </View>
//         </CameraView>
//       </View>

//       {/* Photo Counter */}
//       {/* <View style={styles.counter}>
//         <Text style={styles.counterText}>
//           {photos.length} / 5 photos
//         </Text>
//       </View> */}

//       {/* Camera Controls */}
//       <View style={styles.controls}>
//         <TouchableOpacity 
//           style={styles.backButton}
//           onPress={() => router.back()}
//         >
//           <AntDesign name="close" size={24} color="rgba(255,255,255,0.9)" />
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.shutterButton} 
//           onPress={takePicture}
//           activeOpacity={0.8}
//         >
//           <View style={styles.shutterInner} />
//           <View style={styles.decorativeRing} />
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.previewButton}
//           onPress={goToPreview}
//           disabled={photos.length === 0}
//         >
//           <MaterialIcons 
//             name="arrow-forward" 
//             size={28} 
//             color={photos.length > 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"} 
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Photo Previews */}
//       {photos.length > 0 && (
//         <View style={styles.photoPreviewContainer}>
//           {photos.map((uri: any, index: number) => (
//             <TouchableOpacity 
//               key={index} 
//               style={styles.previewItem}
//               onPress={() => handleRetake(index)}
//             >
//               <Image source={{ uri }} style={styles.previewImage} />
//               <View style={styles.retakeBadge}>
//                 <AntDesign name="close" size={12} color="white" />
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 60,
//     paddingBottom: 20,
//     zIndex: 10,
//   },
//   titleContainer: {
//     alignItems: 'center',
//   },
//   appTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: '400',
//     letterSpacing: 3,
//     fontFamily: 'serif',
//   },
//   flipButton: {
//     width: 44,
//     height: 44,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cameraContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 20,
//     borderRadius: 20,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.2)',
//     backgroundColor: 'rgba(0,0,0,0.2)',
//   },
//   camera: {
//     width: '100%',
//     aspectRatio: 3/4,
//   },
//   cameraFrame: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   frameCorner: {
//     position: 'absolute',
//     width: 30,
//     height: 30,
//     borderColor: 'rgba(255,255,255,0.7)',
//   },
//   frameCornerTopLeft: {
//     top: 10,
//     left: 10,
//     borderTopWidth: 2,
//     borderLeftWidth: 2,
//   },
//   frameCornerTopRight: {
//     top: 10,
//     right: 10,
//     borderTopWidth: 2,
//     borderRightWidth: 2,
//   },
//   frameCornerBottomLeft: {
//     bottom: 10,
//     left: 10,
//     borderBottomWidth: 2,
//     borderLeftWidth: 2,
//   },
//   frameCornerBottomRight: {
//     bottom: 10,
//     right: 10,
//     borderBottomWidth: 2,
//     borderRightWidth: 2,
//   },
//   counter: {
//     position: 'absolute',
//     top: 130,
//     alignSelf: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//   },
//   counterText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   controls: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 50,
//     paddingBottom: 50,
//     paddingTop: 30,
//   },
//   backButton: {
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   previewButton: {
//     width: 50,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   shutterButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: 'rgba(245,245,220,0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 4,
//     borderColor: 'rgba(139,69,19,0.5)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 8 },
//     shadowOpacity: 0.3,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   shutterInner: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'rgba(139,69,19,0.7)',
//   },
//   decorativeRing: {
//     position: 'absolute',
//     top: -2,
//     left: -2,
//     right: -2,
//     bottom: -2,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: 'rgba(255,255,255,0.3)',
//     pointerEvents: 'none',
//   },
//   photoPreviewContainer: {
//     position: 'absolute',
//     bottom: 120,
//     left: 20,
//     flexDirection: 'row',
//     gap: 10,
//   },
//   previewItem: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.3)',
//   },
//   previewImage: {
//     width: '100%',
//     height: '100%',
//   },
//   retakeBadge: {
//     position: 'absolute',
//     top: 4,
//     right: 4,
//     backgroundColor: 'rgba(255,0,0,0.7)',
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   permissionContent: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     zIndex: 20,
//   },
//   permissionText: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//     fontFamily: 'serif',
//     letterSpacing: 1,
//   },
//   permissionButton: {
//     backgroundColor: 'rgba(139,69,19,0.7)',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   permissionButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     letterSpacing: 1,
//   },
// });




import { usePhotoContext } from '@/context/PhotoContext';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { CameraType, CameraView, FlashMode, useCameraPermissions } from 'expo-camera';
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
  const [flash, setFlash] = useState<FlashMode>('off'); // Added flash state
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      (async () => {
        await requestPermission();
      })();
    }
  }, [permission]);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  // Added flash toggle function
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
        {/* Added flash button */}
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
          flash={flash} // Added flash prop
        >
          {/* Frame overlay for camera */}
          <View style={styles.cameraFrame}>
            <View style={styles.frameCornerTopLeft} />
            <View style={styles.frameCornerTopRight} />
            <View style={styles.frameCornerBottomLeft} />
            <View style={styles.frameCornerBottomRight} />
          </View>
        </CameraView>
      </View>

      {/* Camera Controls */}
      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <AntDesign name="close" size={24} color="rgba(255,255,255,0.9)" />
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
  // Added flash button style
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
  cameraFrame: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameCorner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  frameCornerTopLeft: {
    top: 10,
    left: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  frameCornerTopRight: {
    top: 10,
    right: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  frameCornerBottomLeft: {
    bottom: 10,
    left: 10,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  frameCornerBottomRight: {
    bottom: 10,
    right: 10,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingBottom: 50,
    paddingTop: 30,
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
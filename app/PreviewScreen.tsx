
// import { usePhotoContext } from '@/context/PhotoContext';
// import { MaterialIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import React, { useState } from 'react';
// import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function PreviewScreen() {
//   const { photos, clearPhotos } = usePhotoContext();
//   const [applyingFilter, setApplyingFilter] = useState(false);

//   const handleGenerateMemory = () => {
//     router.push('/MessageScreen');
//   };

//   const handleRetakeAll = () => {
//     clearPhotos();
//     router.back();
//   };

//   return (
//     <ImageBackground
//       source={require('@/assets/images/moment_background.jpg')}
//       style={styles.background}
//       imageStyle={styles.backgroundImage}
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>Preview Your Memory</Text>
//         <Text style={styles.subtitle}>Add a message or generate your memory PDF</Text>

//         <ScrollView contentContainerStyle={styles.photosContainer}>
//           {photos.map((uri: any, index: number) => (
//             <View key={index} style={styles.photoContainer}>
//               <Image 
//                 source={{ uri }} 
//                 style={styles.photo} 
//               />
//               <View style={styles.photoNumber}>
//                 <Text style={styles.photoNumberText}>{index + 1}</Text>
//               </View>
//             </View>
//           ))}
//         </ScrollView>

//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity style={styles.retakeButton} onPress={handleRetakeAll}>
//             <MaterialIcons name="replay" size={24} color="white" />
//             <Text style={styles.buttonText}>Retake All</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.continueButton} onPress={handleGenerateMemory}>
//             <Text style={styles.buttonText}>Continue</Text>
//             <MaterialIcons name="arrow-forward" size={24} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   backgroundImage: {
//     resizeMode: 'cover',
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     padding: 20,
//     paddingTop: 50,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#bbb',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   photosContainer: {
//     flexGrow: 1,
//     paddingBottom: 20,
//   },
//   photoContainer: {
//     marginBottom: 25,
//     borderRadius: 15,
//     overflow: 'hidden',
//     borderWidth: 2,
//     borderColor: '#6a1b9a',
//     position: 'relative',
//   },
//   photo: {
//     width: '100%',
//     aspectRatio: 3/4,
//   },
//   photoNumber: {
//     position: 'absolute',
//     top: 15,
//     left: 15,
//     backgroundColor: 'rgba(106, 27, 154, 0.8)',
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   photoNumberText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   retakeButton: {
//     backgroundColor: '#333',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     gap: 10,
//   },
//   continueButton: {
//     backgroundColor: '#6a1b9a',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 30,
//     gap: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });






// import { usePhotoContext } from '@/context/PhotoContext';
// import { AntDesign, MaterialIcons } from '@expo/vector-icons'; // ADDED AntDesign
// import { router } from 'expo-router';
// import React, { useState } from 'react';
// import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function PreviewScreen() {
//   const { photos, clearPhotos, removePhoto } = usePhotoContext(); // ADDED removePhoto
//   const [applyingFilter, setApplyingFilter] = useState(false);

//   const handleGenerateMemory = () => {
//     router.push('/MessageScreen');
//   };

//   const handleRetakeAll = () => {
//     clearPhotos();
//     router.back();
//   };

//   // ADDED: Function to remove individual photo
//   const handleRemovePhoto = (index: number) => {
//     removePhoto(index);
//   };

//   return (
//     <ImageBackground
//       source={require('@/assets/images/moment_background.jpg')}
//       style={styles.background}
//       imageStyle={styles.backgroundImage}
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>Preview Your Memory</Text>

//         <ScrollView contentContainerStyle={styles.photosContainer}>
//           {photos.map((uri: any, index: number) => (
//             <View key={index} style={styles.photoContainer}>
//               <Image 
//                 source={{ uri }} 
//                 style={styles.photo} 
//               />
//               {/* ADDED: Close button */}
//               <TouchableOpacity 
//                 style={styles.closeButton}
//                 onPress={() => handleRemovePhoto(index)}
//               >
//                 <AntDesign name="close" size={20} color="white" />
//               </TouchableOpacity>
              
//               <View style={styles.photoNumber}>
//                 <Text style={styles.photoNumberText}>{index + 1}</Text>
//               </View>
//             </View>
//           ))}
//         </ScrollView>

//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity style={styles.retakeButton} onPress={handleRetakeAll}>
//             <MaterialIcons name="replay" size={24} color="white" />
//             <Text style={styles.buttonText}>Retake</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.continueButton} onPress={handleGenerateMemory}>
//             <Text style={styles.buttonText}>Continue</Text>
//             <MaterialIcons name="arrow-forward" size={24} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// }


import { usePhotoContext } from '@/context/PhotoContext';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PreviewScreen() {
  const { photos, clearPhotos, removePhoto } = usePhotoContext();
  const [applyingFilter, setApplyingFilter] = useState(false);

  const handleGenerateMemory = () => {
    if (photos.length === 0) {
      Alert.alert('No Photos', 'Please capture at least one photo before continuing.');
      return;
    }

    router.push('/MessageScreen');
  };

  const handleRetakeAll = () => {
    clearPhotos();
    router.back();
  };

  const handleRemovePhoto = (index: number) => {
    removePhoto(index);
  };

  // ✅ Go back to camera if no photos left
//   useEffect(() => {
//   if (photos.length === 0) {
//     Alert.alert('No Photos Left', 'All photos were removed. Returning to camera.');
//     setTimeout(() => {
//       router.back();
//     }, 1000);
//   }
// }, [photos]);

  return (
    <ImageBackground
      source={require('@/assets/images/moment_background.jpg')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Preview Your Memory</Text>

        <ScrollView contentContainerStyle={styles.photosContainer}>
          {photos.map((uri: any, index: number) => (
            <View key={index} style={styles.photoContainer}>
              <Image source={{ uri }} style={styles.photo} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => handleRemovePhoto(index)}
              >
                <AntDesign name="close" size={20} color="white" />
              </TouchableOpacity>

              <View style={styles.photoNumber}>
                <Text style={styles.photoNumberText}>{index + 1}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetakeAll}>
            <MaterialIcons name="replay" size={24} color="white" />
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.continueButton,
              photos.length === 0 && { opacity: 0.5 },
            ]}
            onPress={handleGenerateMemory}
            disabled={photos.length === 0}
          >
            <Text style={styles.buttonText}>Continue</Text>
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    paddingBottom: 90,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: '300',
    letterSpacing: 2,
    fontFamily: 'serif',
    marginBottom: 8,
  },
  photosContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 20,
  },
  photoContainer: {
    marginBottom: 25,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    position: 'relative',
  },
  photo: {
    width: '100%',
    aspectRatio: 4 / 5,
  },
  // ADDED: Close button styles
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(241, 52, 52, 0.7)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  photoNumber: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(139,69,19,0.5)',
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
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
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
    backgroundColor: 'rgba(139,69,19,0.5)',
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
    fontFamily: 'serif',
  },
});
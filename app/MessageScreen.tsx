// import { usePhotoContext } from '@/context/PhotoContext';
// import { MaterialIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function MessageScreen() {
//   const { photos, message, setMessage } = usePhotoContext();
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleGenerateMemory = async () => {
//     if (photos.length === 0) return;
    
//     setIsGenerating(true);
//     router.push('/PdfScreen');
//     setIsGenerating(false);
//   };

//   return (
    
//     <View style={styles.container}>
//       <Text style={styles.title}>Add a Personal Message</Text>
//       <Text style={styles.subtitle}>Your message will be included in the memory PDF</Text>
      
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={message}
//           onChangeText={setMessage}
//           placeholder="Write something about this moment..."
//           placeholderTextColor="#888"
//           multiline
//           numberOfLines={5}
//           maxLength={200}
//         />
//         <Text style={styles.charCount}>{message.length}/200 characters</Text>
//       </View>
      
//       <TouchableOpacity 
//         style={styles.generateButton}
//         onPress={handleGenerateMemory}
//         disabled={isGenerating}
//       >
//         {isGenerating ? (
//           <MaterialIcons name="loop" size={24} color="white" />
//         ) : (
//           <>
//             <Text style={styles.generateButtonText}>Generate Memory PDF</Text>
//             <MaterialIcons name="picture-as-pdf" size={24} color="white" />
//           </>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1a1a1a',
//     padding: 20,
//     paddingTop: 50,
//   },
//   title: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: '300',
//     letterSpacing: 2,
//     fontFamily: 'serif',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#bbb',
//     textAlign: 'center',
//     fontFamily: 'serif',
//     marginBottom: 40,
//   },
//   inputContainer: {
//     backgroundColor: '#333',
//     borderRadius: 15,
//     padding: 20,
//     fontFamily: 'serif',
//     marginBottom: 30,
//   },
//   input: {
//     backgroundColor: '#222',
//     color: 'white',
//     borderRadius: 10,
//     padding: 15,
//     minHeight: 150,
//     textAlignVertical: 'top',
//     fontSize: 16,
//     fontFamily: 'serif',
//     marginBottom: 15,
//   },
//   charCount: {
//     color: '#888',
//     textAlign: 'right',
//     fontSize: 14,
//   },
//   generateButton: {
//     backgroundColor: '#6a1b9a',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 18,
//     borderRadius: 30,
//     gap: 12,
//   },
//   generateButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//     fontFamily: 'serif',
//   },
// });


import { usePhotoContext } from '@/context/PhotoContext';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    <ImageBackground
      source={require('@/assets/images/moment_background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 2,
    fontFamily: 'serif',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: '#222',
    borderColor: 'rgba(139,69,19,0.7)',
    borderRadius: 15,
    padding: 20,
    fontFamily: 'serif',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#rgba(139,69,19,0.2)',
    color: 'white',
    borderRadius: 10,
    padding: 15,
    minHeight: 150,
    textAlignVertical: 'top',
    fontSize: 16,
    fontFamily: 'serif',
    marginBottom: 15,
  },
  charCount: {
    color: '#aaa',
    textAlign: 'right',
    fontSize: 14,
  },
  generateButton: {
    backgroundColor: '#rgba(139,69,19,0.7)',
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
    fontFamily: 'serif',
  },
});

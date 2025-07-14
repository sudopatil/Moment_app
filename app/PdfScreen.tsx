// import { useEffect, useState } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert, Platform } from 'react-native';
// import { usePhotoContext } from '@/context/PhotoContext';
// import { MaterialIcons } from '@expo/vector-icons';
// import { generateMemoryPDF, sharePDF, savePhotosToGallery, savePDFToDevice } from '@/utils/pdfUtils';
// import * as FileSystem from 'expo-file-system';
// import { router } from 'expo-router';
// import React from 'react';

// export default function PdfScreen() {
//   const { photos, message, clearPhotos } = usePhotoContext();
//   const [pdfUri, setPdfUri] = useState<string | null>(null);
//   const [isGenerating, setIsGenerating] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const generatePDF = async () => {
//       try {
//         if (photos.length === 0) {
//           router.back();
//           return;
//         }
        
//         const uri = await generateMemoryPDF(photos, message);
//         setPdfUri(uri);
//       } catch (err) {
//         setError('Failed to generate PDF. Please try again.');
//         console.error(err);
//       } finally {
//         setIsGenerating(false);
//       }
//     };

//     generatePDF();
//   }, []);

//   const handleShare = async () => {
//     if (pdfUri) {
//       await sharePDF(pdfUri);
//     }
//   };

//  const handleSavePDF = async () => {
//     if (!pdfUri) return;
    
//     setIsSaving(true);
//     try {
//       const success = await savePDFToDevice(pdfUri);
//       if (success) {
//         if (Platform.OS === 'android') {
//           Alert.alert(
//             'PDF Saved!', 
//             'Your memory PDF has been saved to your Photos app in the "Moment App" album'
//           );
//         } else {
//           Alert.alert('PDF Saved!', 'Your memory PDF has been saved to your Photos app');
//         }
//       } else {
//         // Error is handled in the utility function
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to save PDF');
//     }
//     setIsSaving(false);
//   };

//   const handleSavePhotos = async () => {
//     setIsSaving(true);
//     try {
//       const success = await savePhotosToGallery(photos);
//       if (success) {
//         Alert.alert('Success', 'Photos saved to your gallery!');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to save photos to gallery');
//     }
//     setIsSaving(false);
//   };

//   const handleFinish = () => {
//     clearPhotos();
//     router.replace('/(tabs)/');
//   };

  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Your Memory is Ready!</Text>
      
//       {isGenerating ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#6a1b9a" />
//           <Text style={styles.loadingText}>Creating your memory PDF...</Text>
//         </View>
//       ) : error ? (
//         <View style={styles.errorContainer}>
//           <MaterialIcons name="error-outline" size={60} color="#ff5555" />
//           <Text style={styles.errorText}>{error}</Text>
          
//           <TouchableOpacity 
//             style={styles.retryButton} 
//             onPress={() => router.back()}
//           >
//             <Text style={styles.retryButtonText}>Try Again</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <>
//           <View style={styles.successContainer}>
//             <MaterialIcons name="picture-as-pdf" size={100} color="#6a1b9a" />
//             <Text style={styles.successText}>Memory PDF Created Successfully</Text>
//             <Text style={styles.details}>
//               {photos.length} photo{photos.length > 1 ? 's' : ''} • {message ? 'With message' : 'No message'}
//             </Text>
            
//             <View style={styles.fileInfo}>
//               <MaterialIcons name="info" size={20} color="#bbb" />
//               <Text style={styles.fileInfoText}>
//                 PDF saved to: {FileSystem.documentDirectory}memory.pdf
//               </Text>
//             </View>
//           </View>
          
//           <View style={styles.buttonsContainer}>
//             <TouchableOpacity 
//               style={[styles.actionButton, styles.saveButton]}
//               onPress={handleSavePhotos}
//               disabled={isSaving}
//             >
//               <MaterialIcons name="photo-library" size={24} color="white" />
//               <Text style={styles.buttonText}>Save Photos</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[styles.actionButton, styles.saveButton]}
//               onPress={handleSavePDF}
//               disabled={isSaving}
//             >
//               <MaterialIcons name="save-alt" size={24} color="white" />
//               <Text style={styles.buttonText}>Save PDF</Text>
//             </TouchableOpacity>
//           </View>
          
//           <View style={styles.buttonsContainer}>
//             <TouchableOpacity 
//               style={[styles.actionButton, styles.shareButton]} 
//               onPress={handleShare}
//             >
//               <MaterialIcons name="share" size={24} color="white" />
//               <Text style={styles.buttonText}>Share PDF</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[styles.actionButton, styles.finishButton]} 
//               onPress={handleFinish}
//             >
//               <Text style={styles.buttonText}>Finish</Text>
//               <MaterialIcons name="check" size={24} color="white" />
//             </TouchableOpacity>
//           </View>
          
//           {isSaving && (
//             <View style={styles.savingOverlay}>
//               <ActivityIndicator size="large" color="#6a1b9a" />
//               <Text style={styles.savingText}>Saving to gallery...</Text>
//             </View>
//           )}
//         </>
//       )}
//     </View>
//   );
// }


import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert, Platform } from 'react-native';
import { usePhotoContext } from '@/context/PhotoContext';
import { MaterialIcons } from '@expo/vector-icons';
import { generateMemoryPDF, sharePDF, savePhotosToGallery, savePDFToDevice } from '@/utils/pdfUtils';
import { router } from 'expo-router';
import React from 'react';

export default function PdfScreen() {
  const { photos, message, clearPhotos } = usePhotoContext();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generatePDF = async () => {
      try {
        if (photos.length === 0) {
          router.back();
          return;
        }
        
        const uri = await generateMemoryPDF(photos, message);
        setPdfUri(uri);
      } catch (err) {
        setError('Failed to generate PDF. Please try again.');
        console.error(err);
      } finally {
        setIsGenerating(false);
      }
    };

    generatePDF();
  }, []);

  const handleShare = async () => {
    if (pdfUri) {
      await sharePDF(pdfUri);
    }
  };

  const handleSavePDF = async () => {
    if (!pdfUri) return;
    
    setIsSaving(true);
    try {
      const success = await savePDFToDevice(pdfUri);
      if (success) {
        if (Platform.OS === 'android') {
          Alert.alert(
            'PDF Saved!', 
            'Your memory PDF has been saved to your Photos app in the "Moment App" album'
          );
        } else {
          Alert.alert('PDF Saved!', 'Your memory PDF has been saved to your Photos app');
        }
      } else {
        Alert.alert(
          'Save PDF', 
          Platform.OS === 'android' 
            ? 'Use the "Share" button to save the PDF to your Downloads folder'
            : 'Please check permissions and try again'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save PDF');
    }
    setIsSaving(false);
  };

  const handleSavePhotos = async () => {
    setIsSaving(true);
    try {
      const success = await savePhotosToGallery(photos);
      if (success) {
        Alert.alert('Success', 'Photos saved to your gallery!');
      } else {
        Alert.alert('Error', 'Failed to save photos. Please check permissions.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save photos to gallery');
    }
    setIsSaving(false);
  };

  const handleFinish = () => {
    clearPhotos();
    router.replace('/(tabs)/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Memory is Ready!</Text>
      
      {isGenerating ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6a1b9a" />
          <Text style={styles.loadingText}>Creating your memory PDF...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={60} color="#ff5555" />
          <Text style={styles.errorText}>{error}</Text>
          
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => router.back()}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.successContainer}>
            <MaterialIcons name="picture-as-pdf" size={100} color="#6a1b9a" />
            <Text style={styles.successText}>Memory PDF Created Successfully</Text>
            <Text style={styles.details}>
              {photos.length} photo{photos.length > 1 ? 's' : ''} • {message ? 'With message' : 'No message'}
            </Text>
          </View>
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSavePhotos}
              disabled={isSaving}
            >
              <MaterialIcons name="photo-library" size={24} color="white" />
              <Text style={styles.buttonText}>Save Photos</Text>
            </TouchableOpacity>
            
            {Platform.OS === 'ios' && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.saveButton]}
                onPress={handleSavePDF}
                disabled={isSaving}
              >
                <MaterialIcons name="save-alt" size={24} color="white" />
                <Text style={styles.buttonText}>Save PDF</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.shareButton]} 
              onPress={handleShare}
            >
              <MaterialIcons name="share" size={24} color="white" />
              <Text style={styles.buttonText}>Share PDF</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.finishButton]} 
              onPress={handleFinish}
            >
              <Text style={styles.buttonText}>Finish</Text>
              <MaterialIcons name="check" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {isSaving && (
            <View style={styles.savingOverlay}>
              <ActivityIndicator size="large" color="#6a1b9a" />
              <Text style={styles.savingText}>Saving to gallery...</Text>
            </View>
          )}
          
          {Platform.OS === 'android' && (
            <View style={styles.androidTip}>
              <Text style={styles.tipText}>
                To save the PDF to your device, use the "Share" button and select 
                "Save to Downloads" from the share sheet
              </Text>
            </View>
          )}
        </>
      )}
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
    marginBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  errorText: {
    color: '#ff5555',
    fontSize: 18,
    textAlign: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  successText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  details: {
    color: '#bbb',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  shareButton: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    gap: 10,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  finishButton: {
    backgroundColor: '#6a1b9a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    gap: 10,
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    gap: 10,
    flex: 1,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#2a6f97', // Different blue for save actions
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 10,
    gap: 8,
  },
  fileInfoText: {
    color: '#bbb',
    fontSize: 12,
    flex: 1,
  },
  savingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  savingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
  retryButton: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 30,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  androidTip: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.07)',
    padding: 16,
    borderRadius: 10,
  },
  tipText: {
    color: '#bbb',
    fontSize: 14,
    textAlign: 'center',
  },
});
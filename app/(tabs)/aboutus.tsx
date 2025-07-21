import { Collapsible } from '@/components/Collapsible';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function AboutUsScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/moment_background.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay} />

      <View style={styles.header}>
        <Text style={styles.title}>ABOUT MOMENT</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.box}>
          <Text style={styles.description}>
            Moment App is your personal memory keeper, helping you capture and preserve life's most
            meaningful moments with a touch of vintage charm.
          </Text>
        </View>

        {/* Wrap Collapsible titles in styled Views */}
        <View style={styles.collapsibleContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>How It Works</Text>
          </View>
          <Collapsible title="">
            <Text style={styles.contentText}>
              Tap the camera button to capture up to 5 photos. Retake or add more as needed.
              Preview them with a beautiful vintage filter.
            </Text>
          </Collapsible>
        </View>

        <View style={styles.collapsibleContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Generate PDF Memories</Text>
          </View>
          <Collapsible title="">
            <Text style={styles.contentText}>
              Add a personal message and generate a printable PDF. Photos are arranged vertically
              with stylish frames.
            </Text>
          </Collapsible>
        </View>

        <View style={styles.collapsibleContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Why Use Moment?</Text>
          </View>
          <Collapsible title="">
            <Text style={styles.contentText}>
              In a world of endless scrolling, Moment helps you create timeless, tangible memories
              worth saving and sharing.
            </Text>
          </Collapsible>
        </View>

        <View style={styles.collapsibleContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Contact & Feedback</Text>
          </View>
          <Collapsible title="">
            <Text style={styles.contentText}>
              Have feedback or ideas? We'd love to hear from you. Reach out via our socials or
              support email.
            </Text>
          </Collapsible>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  header: {
    paddingTop: 80,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'serif',
    letterSpacing: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    paddingTop: 10,
  },
  box: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  description: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  collapsibleContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  titleContainer: {
    backgroundColor: '#rgba(139,69,19,0.3)', // Rich brown color
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  titleText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'serif',
  },
  contentText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'serif',
    backgroundColor: 'rgba(139,69,19,0.3)', // Light brown background
    padding: 15,
  },
});
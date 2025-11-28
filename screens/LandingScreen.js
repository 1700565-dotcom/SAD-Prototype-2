// File: screens/LandingScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LandingScreen({ onSignup, onLogin }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome to GoSafeLink</Text>
          <Text style={styles.headerSubtitle}>Your safety, our priority</Text>
        </View>

        {/* ACTION CARDS */}
        <View style={styles.cards}>
          {/* Sign Up */}
          <TouchableOpacity
            onPress={onSignup}
            activeOpacity={0.9}
            style={[styles.card, styles.signupCard]}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-add" size={40} color="#fff" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Sign Up</Text>
                <Text style={styles.cardSubtitle}>Create a new GoSafeLink account</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Login */}
          <TouchableOpacity
            onPress={onLogin}
            activeOpacity={0.9}
            style={[styles.card, styles.loginCard]}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="log-in" size={40} color="#fff" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Already have an account?</Text>
                <Text style={styles.cardSubtitle}>Login to continue</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  content: { padding: 20, paddingTop: 60, gap: 25 },
  header: { marginBottom: 10 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#1f2937' },
  headerSubtitle: { fontSize: 15, color: '#6b7280', marginTop: 2 },
  cards: { gap: 18 },
  card: {
    borderRadius: 25,
    padding: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  signupCard: { backgroundColor: '#2563eb' },
  loginCard: { backgroundColor: '#10b981' },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)' },
});
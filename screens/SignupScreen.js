// File: screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from './AppContext';

export default function SignupScreen({ onSignedUp, onLogin }) {
  const { signUp } = useApp();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function submit() {
    if (!name.trim() || !password) return Alert.alert('Error', 'Please enter name and password');
    const res = signUp({ name: name.trim(), password });
    if (!res.ok) return Alert.alert('Error', res.error);

    Alert.alert('Success', 'Account created! You may now log in.');
    onSignedUp();
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="person-add" size={48} color="#fff" />
          </View>
          <Text style={styles.title}>GoSafeLink</Text>
          <Text style={styles.subtitle}>Create Your Account</Text>
        </View>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />

        <TouchableOpacity onPress={submit} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onLogin} style={{ marginTop: 18, alignSelf: 'center' }}>
          <Text style={{ color: '#2563eb', fontWeight: '600' }}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fef3c7', justifyContent: 'center', padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  logoContainer: { alignItems: 'center', marginBottom: 30 },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  title: { fontSize: 34, fontWeight: 'bold', color: '#2563eb', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 10 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 15, padding: 15, fontSize: 16, marginBottom: 15 },
  button: {
    marginTop: 10,
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
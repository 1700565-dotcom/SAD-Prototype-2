// File: screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from './AppContext';

export default function SignupScreen({ onSignedUp, onLogin }) {
  const { signUp } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    // Philippine phone number format (09XX-XXX-XXXX or +639XX-XXX-XXXX)
    const phoneRegex = /^(\+?63|0)?9\d{9}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
  }

  function submit() {
    // Validation
    if (!name.trim()) {
      return Alert.alert('Error', 'Please enter your full name');
    }
    
    if (!email.trim()) {
      return Alert.alert('Error', 'Please enter your email address');
    }
    
    if (!validateEmail(email)) {
      return Alert.alert('Error', 'Please enter a valid email address');
    }
    
    if (!contactNumber.trim()) {
      return Alert.alert('Error', 'Please enter your contact number');
    }
    
    if (!validatePhone(contactNumber)) {
      return Alert.alert('Error', 'Please enter a valid Philippine phone number (e.g., 09XX-XXX-XXXX)');
    }
    
    if (!password) {
      return Alert.alert('Error', 'Please enter a password');
    }
    
    if (password.length < 6) {
      return Alert.alert('Error', 'Password must be at least 6 characters long');
    }
    
    if (password !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    const res = signUp({ 
      name: name.trim(), 
      email: email.trim().toLowerCase(),
      contactNumber: contactNumber.trim(),
      password 
    });
    
    if (!res.ok) {
      return Alert.alert('Error', res.error);
    }

    Alert.alert('Success', 'Account created! You may now log in.');
    onSignedUp();
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="person-add" size={48} color="#fff" />
            </View>
            <Text style={styles.title}>GoSafeLink</Text>
            <Text style={styles.subtitle}>Create Your Account</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  placeholder="Juan Dela Cruz"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {/* Email Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  placeholder="juan@example.com"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Contact Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contact Number *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  placeholder="09XX-XXX-XXXX"
                  value={contactNumber}
                  onChangeText={setContactNumber}
                  style={styles.input}
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  placeholder="At least 6 characters"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#6b7280" style={styles.inputIcon} />
                <TextInput
                  placeholder="Re-enter your password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.input}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity onPress={submit} style={styles.button}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity onPress={onLogin} style={styles.loginLink}>
              <Text style={styles.loginLinkText}>
                Already have an account? <Text style={styles.loginLinkBold}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fef3c7',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 40,
  },
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
  logoContainer: { 
    alignItems: 'center', 
    marginBottom: 30 
  },
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
  title: { 
    fontSize: 34, 
    fontWeight: 'bold', 
    color: '#2563eb', 
    marginBottom: 6 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#6b7280', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  
  formContainer: {
    gap: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#1f2937',
  },
  
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
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  
  loginLink: {
    marginTop: 18,
    alignSelf: 'center',
  },
  loginLinkText: {
    color: '#6b7280',
    fontSize: 14,
  },
  loginLinkBold: {
    color: '#2563eb',
    fontWeight: '700',
  },
});
// -------------------------
// File: src/screens/LoginScreen.js
// -------------------------
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "./AppContext";

export default function LoginScreen({ onLogin, onSignup }) {
  const { login } = useApp();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    if (!name.trim() || !password)
      return Alert.alert("Enter credentials");

    const res = login({ name: name.trim(), password });

    if (!res.ok) {
      return Alert.alert("Login failed", res.error);
    }

    // ⭐ Pass BOTH name and role to App.js
    onLogin(res.name, res.role);
  }

  return (
    <View style={styles.loginContainer}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.loginCard}>
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="alert-circle" size={48} color="#fff" />
          </View>
          <Text style={styles.title}>GoSafeLink</Text>
          <Text style={styles.subtitle}>
            Disaster Relief Resource Allocation System
          </Text>
        </View>

        {/* INPUTS */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#9ca3af"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#9ca3af"
          />

          {/* LOGIN BUTTON */}
          <TouchableOpacity style={styles.loginButton} onPress={submit}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* SIGNUP LINK */}
        <TouchableOpacity
          style={{ marginTop: 18, alignSelf: "center" }}
          onPress={onSignup}
        >
          <Text style={{ color: "#2563eb", fontWeight: "600" }}>
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#fef3c7",
    justifyContent: "center",
    padding: 20,
  },
  loginCard: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
  },

  inputContainer: {
    gap: 15,
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
  },

  loginButton: {
    marginTop: 5,
    borderRadius: 15,
    backgroundColor: "#dc2626",
    padding: 16,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
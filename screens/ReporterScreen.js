// File: src/screens/ReporterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "./AppContext";

export default function ReporterScreen({ onBack }) {
  const { sendSos } = useApp();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Medical");
  const [description, setDescription] = useState("");
  const [need, setNeed] = useState("Immediate Transport");

  function submit() {
    if (!location.trim() || !description.trim())
      return Alert.alert("Missing Fields", "Please fill out all required fields.");

    sendSos({ type, location, description, need, reporter: "Citizen (Device)" });

    Alert.alert("SOS Sent", "Your emergency request has been broadcast.");
    setLocation("");
    setDescription("");
  }

  return (
    <View style={styles.container}>
      {/* HEADER WITH BACK ARROW */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Report SOS</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* FORM CARD */}
        <View style={styles.card}>
          {/* LOCATION */}
          <Text style={styles.label}>Location *</Text>
          <TextInput
            style={styles.input}
            placeholder="Address or coordinates (lat, long)"
            value={location}
            onChangeText={setLocation}
          />

          {/* TYPE */}
          <Text style={styles.label}>Emergency Type</Text>
          <View style={styles.staticField}>
            <Ionicons name="alert-circle" size={18} color="#2563eb" />
            <Text style={styles.staticText}>{type}</Text>
          </View>

          {/* DESCRIPTION */}
          <Text style={styles.label}>Brief Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            placeholder="Describe what is happening..."
            value={description}
            onChangeText={setDescription}
          />

          {/* NEED */}
          <Text style={styles.label}>Immediate Need</Text>
          <View style={styles.staticField}>
            <Ionicons name="medkit" size={18} color="#059669" />
            <Text style={styles.staticText}>{need}</Text>
          </View>

          {/* SEND BUTTON */}
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>🚨 Send SOS Broadcast</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f9ff" },
  scroll: { padding: 20, paddingTop: 0 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  label: { fontWeight: "700", marginBottom: 6, marginTop: 12, fontSize: 14, color: "#374151" },
  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#dbeafe",
    fontSize: 14,
    marginBottom: 10,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  staticField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eff6ff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  staticText: { marginLeft: 8, fontSize: 14, color: "#1e3a8a" },
  button: { backgroundColor: "#ef4444", padding: 15, borderRadius: 16, alignItems: "center", marginTop: 20 },
  buttonText: { color: "white", fontWeight: "800", fontSize: 16 },
});

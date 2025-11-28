// File: src/screens/AdminScreen.js
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "./AppContext";

export default function AdminScreen({ onBack }) {
  const { sosList, validateSos, dismissSos } = useApp();
  const incoming = sosList.filter((s) => s.status === "incoming");

  function onValidate(id) {
    validateSos(id);
    Alert.alert("Validated", "Official Deployment Order issued.");
  }

  function onDismiss(id) {
    dismissSos(id);
    Alert.alert("Dismissed", "Broadcast removed from queue.");
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.screenHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.screenTitle}>CDRRMO Admin Panel</Text>
          <Text style={styles.screenSubtitle}>Incoming SOS Broadcasts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* EMPTY STATE */}
        {incoming.length === 0 && (
          <View style={styles.emptyBox}>
            <Ionicons name="checkmark-done-circle" size={40} color="#22c55e" />
            <Text style={styles.emptyText}>No incoming broadcasts right now.</Text>
          </View>
        )}

        {/* LIST OF SOS */}
        {incoming.map((s) => (
          <View key={s.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="alert-circle" size={24} color="#ef4444" />
              <Text style={styles.cardTitle}>
                {s.type} • {s.location}
              </Text>
            </View>

            <Text style={styles.cardDescription}>{s.description}</Text>
            <Text style={styles.cardMeta}>Reporter: {s.reporter}</Text>
            <Text style={styles.cardMeta}>
              Sent: {new Date(s.timestamp).toLocaleTimeString()}
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.actionButton, styles.validateBtn]} onPress={() => onValidate(s.id)}>
                <Ionicons name="checkmark" size={18} color="white" />
                <Text style={styles.actionText}>Validate & Issue</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionButton, styles.dismissBtn]} onPress={() => onDismiss(s.id)}>
                <Ionicons name="close" size={18} color="white" />
                <Text style={styles.actionText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9", padding: 20, paddingTop: 0 },
  screenHeader: { flexDirection: "row", alignItems: "center", marginBottom: 20, paddingTop: 40 },
  screenTitle: { fontSize: 24, fontWeight: "bold", color: "#1f2937" },
  screenSubtitle: { fontSize: 13, color: "#6b7280" },

  emptyBox: { padding: 30, borderRadius: 18, backgroundColor: "white", alignItems: "center", marginTop: 20, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, elevation: 3 },
  emptyText: { marginTop: 10, fontSize: 16, color: "#475569" },

  card: { backgroundColor: "white", padding: 18, borderRadius: 18, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: "700", marginLeft: 8, color: "#0f172a" },
  cardDescription: { fontSize: 14, color: "#475569", marginBottom: 10 },
  cardMeta: { fontSize: 12, color: "#64748b" },

  buttonRow: { flexDirection: "row", marginTop: 14 },
  actionButton: { flexDirection: "row", alignItems: "center", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12 },
  actionText: { color: "white", fontWeight: "700", marginLeft: 6, fontSize: 13 },
  validateBtn: { backgroundColor: "#22c55e", flex: 1 },
  dismissBtn: { backgroundColor: "#ef4444", flex: 1, marginLeft: 10 },
});

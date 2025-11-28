// File: src/screens/ResponderScreen.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "./AppContext";

export default function ResponderScreen({ onBack }) {
  const { sosList, orders, acknowledgeSos } = useApp();

  function statusIcon(status) {
    if (status === "validated") return <Ionicons name="checkmark-circle" size={22} color="#22c55e" />;
    if (status === "dismissed") return <Ionicons name="close-circle" size={22} color="#ef4444" />;
    if (status === "acknowledged") return <Ionicons name="notifications" size={22} color="#0ea5e9" />;
    return <Ionicons name="alert-circle" size={22} color="#f59e0b" />;
  }

  function handleAcknowledge(id) {
    acknowledgeSos(id);
    Alert.alert("Acknowledged", "Citizen has been notified of your acknowledgment.");
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.screenHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.screenTitle}>Responder Panel</Text>
          <Text style={styles.screenSubtitle}>Unit: Responder A</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* REAL-TIME BROADCASTS */}
        <Text style={styles.sectionTitle}>Real-time Broadcasts (Awareness)</Text>

        {sosList.length === 0 && (
          <View style={styles.emptyBox}>
            <Ionicons name="checkmark-done-circle" size={40} color="#22c55e" />
            <Text style={styles.emptyText}>No broadcasts at this time.</Text>
          </View>
        )}

        {sosList.map((b) => (
          <View key={b.id} style={styles.card}>
            <View style={styles.cardHeader}>
              {statusIcon(b.status)}
              <Text style={styles.cardTitle}>{b.type} • {b.location}</Text>
            </View>
            <Text style={styles.cardDescription}>{b.description}</Text>
            <Text style={styles.cardMeta}>Sent: {new Date(b.timestamp).toLocaleTimeString()}</Text>
            <Text style={styles.statusTag(b.status)}>
              {b.status === "validated"
                ? "VALIDATED • Awaiting Execution"
                : b.status === "dismissed"
                ? "DISMISSED • No Action Required"
                : b.status === "acknowledged"
                ? "ACKNOWLEDGED • Citizen Notified"
                : "INCOMING • For Awareness"}
            </Text>

            {(b.status === "incoming" || b.status === "validated") && (
              <TouchableOpacity style={styles.ackButton} onPress={() => handleAcknowledge(b.id)}>
                <Text style={styles.ackButtonText}>Acknowledge Report</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* DEPLOYMENT ORDERS */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Official Deployment Orders (Instruction)</Text>

        {orders.length === 0 && (
          <View style={styles.emptyBox}>
            <Ionicons name="newspaper" size={40} color="#0ea5e9" />
            <Text style={styles.emptyText}>No deployment orders yet.</Text>
          </View>
        )}

        {orders.map((o) => (
          <View key={o.id} style={styles.orderCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="file-tray-full" size={24} color="#1e3a8a" />
              <Text style={styles.orderTitle}>Deployment Order #{o.id}</Text>
            </View>
            <Text style={styles.orderDetail}>For SOS ID: {o.target}</Text>
            <Text style={styles.orderDetail}>Instruction: {o.note}</Text>
            <Text style={styles.orderMeta}>Issued: {new Date(o.issuedTime).toLocaleTimeString()}</Text>
          </View>
        ))}

        <Text style={styles.footnote}>Local simulation only — real deployments use live broadcast networks.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9", padding: 20, paddingTop: 0 },
  screenHeader: { flexDirection: "row", alignItems: "center", marginBottom: 20, paddingTop: 40 },
  screenTitle: { fontSize: 24, fontWeight: "bold", color: "#1f2937" },
  screenSubtitle: { fontSize: 13, color: "#64748b" },

  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 12, color: "#1e293b" },
  emptyBox: { padding: 25, borderRadius: 18, backgroundColor: "white", alignItems: "center", marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, elevation: 3 },
  emptyText: { marginTop: 10, fontSize: 15, color: "#475569" },

  card: { backgroundColor: "white", padding: 16, borderRadius: 16, marginBottom: 14, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: "700", marginLeft: 8, color: "#0f172a" },
  cardDescription: { fontSize: 14, color: "#475569", marginBottom: 8 },
  cardMeta: { fontSize: 12, color: "#64748b", marginBottom: 10 },

  statusTag: (status) => ({
    fontSize: 12,
    fontWeight: "700",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    textAlign: "center",
    color: "white",
    backgroundColor: status === "validated" ? "#22c55e" : status === "dismissed" ? "#ef4444" : status === "acknowledged" ? "#0ea5e9" : "#f59e0b",
  }),

  ackButton: { marginTop: 10, paddingVertical: 12, borderRadius: 8, backgroundColor: "#0ea5e9", width: "100%", alignItems: "center" },
  ackButtonText: { color: "white", fontWeight: "700", fontSize: 14 },

  orderCard: { backgroundColor: "white", padding: 16, borderRadius: 16, marginBottom: 14, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, elevation: 3 },
  orderTitle: { marginLeft: 8, fontWeight: "700", fontSize: 15, color: "#1e3a8a" },
  orderDetail: { fontSize: 13, color: "#475569", marginTop: 4 },
  orderMeta: { fontSize: 11, color: "#64748b", marginTop: 6 },
  footnote: { marginTop: 20, fontSize: 12, color: "#94a3b8", textAlign: "center" },
});
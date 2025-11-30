// File: src/screens/SafeRouteMapScreen.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Mock Data (extracted from previous App.js)
const shelters = [
  {
    id: "S1",
    name: "Barangay Hall Shelter",
    distance: "450 m",
    status: "Open",
    capacity: 120,
    total: 200,
  },
  {
    id: "S2",
    name: "Elementary School Gym",
    distance: "1.2 km",
    status: "Open",
    capacity: 300,
    total: 400,
  },
  {
    id: "S3",
    name: "Community Center",
    distance: "2.5 km",
    status: "Limited",
    capacity: 180,
    total: 200,
  },
];

export default function SafeRouteMapScreen({ onBack }) {
  return (
    <View style={styles.container}>
      {/* SCREEN HEADER */}
      <View style={styles.screenHeader}>
        {/* The onBack prop here will take the user back to the main Citizen Dashboard tab view */}
        <View style={styles.screenHeaderText}>
          <Text style={styles.screenTitle}>Nearby Shelters</Text>
          <Text style={styles.screenSubtitle}>
            Find the closest evacuation centers
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.sheltersContent}>
        {/* Shelter List */}
        <Text style={styles.listTitle}>Available Shelters & Capacity</Text>
        {shelters.map((item) => {
          const percentage = (item.capacity / item.total) * 100;
          return (
            <View key={item.id} style={styles.shelterCard}>
              <View style={styles.shelterHeader}>
                <View style={styles.shelterInfo}>
                  <Text style={styles.shelterName}>{item.name}</Text>
                  <View style={styles.shelterMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="location" size={16} color="#6b7280" />
                      <Text style={styles.metaText}>{item.distance}</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        item.status === "Open"
                          ? styles.statusOpen
                          : styles.statusLimited,
                      ]}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color={item.status === "Open" ? "#059669" : "#d97706"}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          item.status === "Open"
                            ? styles.statusTextOpen
                            : styles.statusTextLimited,
                        ]}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.capacitySection}>
                <View style={styles.capacityHeader}>
                  <View style={styles.capacityLabel}>
                    <Ionicons name="people" size={16} color="#6b7280" />
                    <Text style={styles.capacityText}>Capacity</Text>
                  </View>
                  <Text style={styles.capacityValue}>
                    {item.capacity}/{item.total}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${percentage}%`,
                        backgroundColor: percentage > 80 ? "#dc2626" : "#2563eb",
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f9ff" },
  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 0, // This will be handled by the parent dashboard's header
    backgroundColor: "#fff",
  },
  screenHeaderText: { flex: 1 },
  screenTitle: { fontSize: 24, fontWeight: "bold", color: "#1f2937" },
  screenSubtitle: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  sheltersContent: { padding: 20, gap: 15 },
  listTitle: { fontSize: 18, fontWeight: '700', color: '#1f2937', marginBottom: 5 },
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#e0f2fe',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#93c5fd',
    borderStyle: 'dashed'
  },
  mapText: { color: '#60a5fa', marginTop: 10, fontWeight: '600' },

  // CARD STYLES (Extracted from old App.js)
  shelterCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  shelterHeader: { marginBottom: 15 },
  shelterInfo: { gap: 10 },
  shelterName: { fontSize: 18, fontWeight: "bold", color: "#1f2937" },
  shelterMeta: { flexDirection: "row", alignItems: "center", gap: 15 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 14, color: "#6b7280" },
  statusBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, gap: 5 },
  statusOpen: { backgroundColor: "#d1fae5" },
  statusLimited: { backgroundColor: "#fef3c7" },
  statusText: { fontSize: 13, fontWeight: "600" },
  statusTextOpen: { color: "#059669" },
  statusTextLimited: { color: "#d97706" },
  capacitySection: { gap: 10 },
  capacityHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  capacityLabel: { flexDirection: "row", alignItems: "center", gap: 5 },
  capacityText: { fontSize: 14, color: "#6b7280" },
  capacityValue: { fontSize: 14, fontWeight: "bold", color: "#1f2937" },
  progressBar: { height: 8, backgroundColor: "#e5e7eb", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 4 },
});
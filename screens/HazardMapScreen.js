// File: src/screens/HazardMapScreen.js
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
const hazards = [
  { id: "H1", type: "Flood", area: "Zone A", active: true },
  { id: "H2", type: "Landslide", area: "Brgy. San Roque", active: false },
  { id: "H3", type: "Storm Surge", area: "Coastal Area", active: true },
];

export default function HazardMapScreen({ onBack }) {
  return (
    <View style={styles.container}>
      {/* SCREEN HEADER */}
      <View style={styles.screenHeader}>
        {/* The onBack prop here will take the user back to the main Citizen Dashboard tab view */}
        <View style={styles.screenHeaderText}>
          <Text style={styles.screenTitle}>Active Hazards</Text>
          <Text style={styles.screenSubtitle}>
            Current danger zones in your area
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.hazardsContent}>
         {/* Placeholder for the actual Hazard Map */}
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={40} color="#fcd34d" />
          <Text style={styles.mapText}>[Map View Placeholder: Hazard Zones]</Text>
        </View>

        {/* Hazard List */}
        <Text style={styles.listTitle}>Hazard Alerts</Text>
        {hazards.map((h) => (
          <View
            key={h.id}
            style={[
              styles.hazardCard,
              h.active ? styles.hazardCardActive : styles.hazardCardInactive,
            ]}
          >
            <View style={styles.hazardContent}>
              <View style={styles.hazardLeft}>
                <View
                  style={[
                    styles.hazardIcon,
                    h.active
                      ? styles.hazardIconActive
                      : styles.hazardIconInactive,
                  ]}
                >
                  <Ionicons
                    name="warning"
                    size={24}
                    color={h.active ? "#dc2626" : "#9ca3af"}
                  />
                </View>
                <View>
                  <Text style={styles.hazardType}>{h.type}</Text>
                  <Text style={styles.hazardArea}>{h.area}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.hazardBadge,
                  h.active
                    ? styles.hazardBadgeActive
                    : styles.hazardBadgeInactive,
                ]}
              >
                <Text
                  style={[
                    styles.hazardBadgeText,
                    h.active
                      ? styles.hazardBadgeTextActive
                      : styles.hazardBadgeTextInactive,
                  ]}
                >
                  {h.active ? "Active" : "Inactive"}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fef2f2" },
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
  hazardsContent: { padding: 20, gap: 15 },
  listTitle: { fontSize: 18, fontWeight: '700', color: '#1f2937', marginBottom: 5 },
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#fffbeb',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#fcd34d',
    borderStyle: 'dashed'
  },
  mapText: { color: '#f59e0b', marginTop: 10, fontWeight: '600' },

  // CARD STYLES (Extracted from old App.js)
  hazardCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  hazardCardActive: {
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  hazardCardInactive: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  hazardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hazardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    flex: 1,
  },
  hazardIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  hazardIconActive: {
    backgroundColor: "#fecaca",
  },
  hazardIconInactive: {
    backgroundColor: "#f3f4f6",
  },
  hazardType: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 3,
  },
  hazardArea: {
    fontSize: 14,
    color: "#6b7280",
  },
  hazardBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  hazardBadgeActive: {
    backgroundColor: "#fecaca",
  },
  hazardBadgeInactive: {
    backgroundColor: "#f3f4f6",
  },
  hazardBadgeText: {
    fontSize: 13,
    fontWeight: "600",
  },
  hazardBadgeTextActive: {
    color: "#dc2626",
  },
  hazardBadgeTextInactive: {
    color: "#6b7280",
  },
});
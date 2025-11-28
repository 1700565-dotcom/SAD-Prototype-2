// File: src/screens/CitizenDashboardScreen.js (UPDATED)
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import Citizen Screens:
import ReporterScreen from "./ReporterScreen";
import SafeRouteMapScreen from "./SafeRouteMapScreen";
import HazardMapScreen from "./HazardMapScreen";

export default function CitizenDashboardScreen({ name, onBack }) {
  const [activeTab, setActiveTab] = useState("Reporter"); // 'Reporter', 'SafeRoute', or 'HazardMap'

  // Function to render the active screen
  const renderScreen = () => {
    // The onBack prop passed to these screens is used to return to the tab view.
    // Since this is the main dashboard, we'll pass a no-op function.
    const internalBack = () => {};

    switch (activeTab) {
      case "Reporter":
        return <ReporterScreen onBack={internalBack} />;
      case "SafeRoute":
        return <SafeRouteMapScreen onBack={internalBack} />;
      case "HazardMap":
        return <HazardMapScreen onBack={internalBack} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* GLOBAL HEADER/NAVIGATION */}
      <View style={styles.topBar}>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Hello, {name}</Text>
          <Text style={styles.roleText}>Citizen Portal</Text>
        </View>
        <TouchableOpacity onPress={onBack} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>

      {/* TAB NAVIGATION */}
      <View style={styles.tabContainer}>
        <TabButton
          icon="megaphone"
          label="Report SOS"
          isActive={activeTab === "Reporter"}
          onPress={() => setActiveTab("Reporter")}
        />
        <TabButton
          icon="navigate"
          label="Safe Route"
          isActive={activeTab === "SafeRoute"}
          onPress={() => setActiveTab("SafeRoute")}
        />
        <TabButton
          icon="warning"
          label="Hazard Map"
          isActive={activeTab === "HazardMap"}
          onPress={() => setActiveTab("HazardMap")}
        />
      </View>

      {/* RENDER ACTIVE SCREEN */}
      <View style={styles.screenContent}>{renderScreen()}</View>
    </View>
  );
}

const TabButton = ({ icon, label, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.tabButton, isActive && styles.activeTab]}
    onPress={onPress}
  >
    <Ionicons
      name={icon}
      size={20}
      color={isActive ? "#1d4ed8" : "#6b7280"}
    />
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f9ff" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  userInfo: { flex: 1 },
  welcomeText: { fontSize: 16, fontWeight: "500", color: "#475569" },
  roleText: { fontSize: 24, fontWeight: "bold", color: "#1f2937" },
  logoutButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fee2e2",
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 3,
  },
  activeTab: { backgroundColor: "#eff6ff" },
  tabText: { marginLeft: 6, fontSize: 13, fontWeight: "600", color: "#6b7280" },
  activeTabText: { color: "#1d4ed8" },

  screenContent: { flex: 1 },
});
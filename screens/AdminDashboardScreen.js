// File: src/screens/AdminDashboardScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Assuming these are in the same directory:
import AdminScreen from "./AdminScreen";
import ResponderScreen from "./ResponderScreen";

export default function AdminDashboardScreen({ name, onBack }) {
  const [activeTab, setActiveTab] = useState("Admin"); // 'Admin' or 'Responder'

  // Functions to render screens that accept an onBack prop for internal navigation if needed
  const renderScreen = () => {
    switch (activeTab) {
      case "Admin":
        // AdminScreen already has internal back functionality to AdminDashboardScreen
        return <AdminScreen onBack={() => setActiveTab("Admin")} />;
      case "Responder":
        // ResponderScreen already has internal back functionality to AdminDashboardScreen
        return <ResponderScreen onBack={() => setActiveTab("Responder")} />;
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
          <Text style={styles.roleText}>Admin Portal</Text>
        </View>
        <TouchableOpacity onPress={onBack} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>

      {/* TAB NAVIGATION */}
      <View style={styles.tabContainer}>
        <TabButton
          icon="shield-checkmark"
          label="Admin Panel"
          isActive={activeTab === "Admin"}
          onPress={() => setActiveTab("Admin")}
        />
        <TabButton
          icon="walk"
          label="Responder View"
          isActive={activeTab === "Responder"}
          onPress={() => setActiveTab("Responder")}
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
  container: { flex: 1, backgroundColor: "#f1f5f9" },
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
    padding: 10,
    backgroundColor: "white",
    marginBottom: 0,
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
    marginHorizontal: 5,
  },
  activeTab: { backgroundColor: "#eff6ff" },
  tabText: { marginLeft: 8, fontSize: 14, fontWeight: "600", color: "#6b7280" },
  tabTabText: { color: "#1d4ed8" },

  screenContent: { flex: 1 },
});
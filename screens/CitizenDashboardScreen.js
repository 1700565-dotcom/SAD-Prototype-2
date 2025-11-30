// File: src/screens/CitizenDashboardScreen.js (UPDATED)
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "./AppContext";

// Import Citizen Screens:
import ReporterScreen from "./ReporterScreen";
import SafeRouteMapScreen from "./SafeRouteMapScreen";
import HazardMapScreen from "./HazardMapScreen";

export default function CitizenDashboardScreen({ name, onBack }) {
  const [activeTab, setActiveTab] = useState("Reporter");
  const { getNotifications, markNotificationAsRead } = useApp();
  const previousNotificationCount = useRef(0);

  // Debug log to verify name prop
  console.log('=== CITIZEN DASHBOARD ===');
  console.log('name prop received:', name);

  // Check for new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const notifications = getNotifications(name);
      const unreadNotifications = notifications.filter((n) => !n.read);
      
      // Check if we have NEW unread notifications
      if (unreadNotifications.length > previousNotificationCount.current) {
        // Get the newest notification
        const newestNotification = unreadNotifications[unreadNotifications.length - 1];
        
        // Show alert
        Alert.alert(
          "Report Acknowledged!",
          newestNotification.message,
          [
            {
              text: "OK",
              onPress: () => {
                markNotificationAsRead(name, newestNotification.id);
              }
            }
          ]
        );
        
        // Update the count
        previousNotificationCount.current = unreadNotifications.length;
      } else {
        // Just update the count if it decreased (notifications were read)
        previousNotificationCount.current = unreadNotifications.length;
      }
    }, 500); // Check every 500ms

    return () => clearInterval(interval);
  }, [name, getNotifications, markNotificationAsRead]);

  // Function to render the active screen
  const renderScreen = () => {
    const internalBack = () => {};

    console.log('=== RENDER SCREEN ===');
    console.log('Rendering tab:', activeTab);
    console.log('name value:', name);

    switch (activeTab) {
      case "Reporter":
        return <ReporterScreen onBack={internalBack} userName={name} />;
      case "SafeRoute":
        return <SafeRouteMapScreen onBack={internalBack} />;
      case "HazardMap":
        return <HazardMapScreen onBack={internalBack} />;
      default:
        return null;
    }
  };

  // Get unread notification count
  const notifications = getNotifications(name);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={styles.container}>
      {/* GLOBAL HEADER/NAVIGATION */}
      <View style={styles.topBar}>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Hello, {name}</Text>
          <Text style={styles.roleText}>Citizen Portal</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {/* Notification Badge */}
          {unreadCount > 0 && (
            <View style={styles.notificationBadge}>
              <Ionicons name="notifications" size={20} color="#0ea5e9" />
              <View style={styles.badgeCount}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            </View>
          )}
          <TouchableOpacity onPress={onBack} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>
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
  
  notificationBadge: {
    position: "relative",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#e0f2fe",
  },
  badgeCount: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#ef4444",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },

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
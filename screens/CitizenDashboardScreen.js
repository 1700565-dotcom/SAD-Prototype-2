// File: src/screens/CitizenDashboardScreen.js (UPDATED)
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "./AppContext";

// Import Citizen Screens:
import ReporterScreen from "./ReporterScreen";
import SafeRouteMapScreen from "./SafeRouteMapScreen";
import HazardMapScreen from "./HazardMapScreen";

export default function CitizenDashboardScreen({ name, onBack }) {
  const [activeTab, setActiveTab] = useState("Reporter");
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const { getNotifications, markNotificationAsRead, clearNotifications } = useApp();
  const shownNotificationIds = useRef(new Set());
  const isShowingAlert = useRef(false);

  // Check for new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Don't check if we're already showing an alert
      if (isShowingAlert.current) return;
      
      const notifications = getNotifications(name);
      const unreadNotifications = notifications.filter((n) => !n.read);
      
      // Find notifications we haven't shown yet
      const newNotifications = unreadNotifications.filter(
        n => !shownNotificationIds.current.has(n.id)
      );
      
      // Show alerts sequentially (one after another)
      if (newNotifications.length > 0) {
        isShowingAlert.current = true;
        showAlertsSequentially(newNotifications, 0);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [name, getNotifications, markNotificationAsRead]);

  // Function to show alerts one by one, waiting for user to dismiss each
  function showAlertsSequentially(notifications, index) {
    if (index >= notifications.length) {
      isShowingAlert.current = false;
      return;
    }
    
    const notification = notifications[index];
    const isLast = index === notifications.length - 1;
    
    Alert.alert(
      isLast ? "Report Acknowledged! ✅" : `Report Acknowledged! ✅ (${index + 1}/${notifications.length})`,
      notification.message,
      [
        {
          text: "OK",
          onPress: () => {
            markNotificationAsRead(name, notification.id);
            shownNotificationIds.current.add(notification.id);
            showAlertsSequentially(notifications, index + 1);
          }
        }
      ]
    );
  }

  // Function to render the active screen
  const renderScreen = () => {
    const internalBack = () => {};

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

  // Get notifications
  const allNotifications = getNotifications(name);
  const unreadCount = allNotifications.filter((n) => !n.read).length;

  // Toggle mark as read/unread
  function toggleReadStatus(notificationId, currentStatus) {
    if (currentStatus) {
      // If read, we need to manually set it to unread
      // For simplicity, just mark as read for now
      return;
    } else {
      markNotificationAsRead(name, notificationId);
    }
  }

  return (
    <View style={styles.container}>
      {/* GLOBAL HEADER/NAVIGATION */}
      <View style={styles.topBar}>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Hello, {name}</Text>
          <Text style={styles.roleText}>Citizen Portal</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {/* Notification Button */}
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => setShowNotificationPanel(true)}
          >
            <Ionicons name="notifications" size={22} color="#0ea5e9" />
            {unreadCount > 0 && (
              <View style={styles.badgeCount}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>

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

      {/* NOTIFICATION PANEL MODAL */}
      <Modal
        visible={showNotificationPanel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotificationPanel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.notificationPanel}>
            {/* Panel Header */}
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>Notifications</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {allNotifications.length > 0 && (
                  <TouchableOpacity 
                    onPress={() => {
                      Alert.alert(
                        "Clear All",
                        "Are you sure you want to clear all notifications?",
                        [
                          { text: "Cancel", style: "cancel" },
                          {
                            text: "Clear",
                            style: "destructive",
                            onPress: () => {
                              clearNotifications(name);
                              setShowNotificationPanel(false);
                            }
                          }
                        ]
                      );
                    }}
                    style={styles.clearButton}
                  >
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  onPress={() => setShowNotificationPanel(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#64748b" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Notifications List */}
            <ScrollView style={styles.notificationList}>
              {allNotifications.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="notifications-off-outline" size={48} color="#cbd5e1" />
                  <Text style={styles.emptyText}>No notifications yet</Text>
                </View>
              ) : (
                allNotifications.map((notification) => (
                  <View 
                    key={notification.id} 
                    style={[
                      styles.notificationItem,
                      !notification.read && styles.unreadNotification
                    ]}
                  >
                    <View style={styles.notificationIcon}>
                      <Ionicons 
                        name={notification.read ? "checkmark-circle" : "alert-circle"} 
                        size={24} 
                        color={notification.read ? "#22c55e" : "#0ea5e9"} 
                      />
                    </View>
                    <View style={styles.notificationContent}>
                      <Text style={styles.notificationMessage}>
                        {notification.message}
                      </Text>
                      <Text style={styles.notificationTime}>
                        {new Date(notification.timestamp).toLocaleString()}
                      </Text>
                    </View>
                    {!notification.read && (
                      <TouchableOpacity
                        style={styles.markReadButton}
                        onPress={() => markNotificationAsRead(name, notification.id)}
                      >
                        <Text style={styles.markReadText}>Mark Read</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  
  notificationButton: {
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  notificationPanel: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  panelTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
  },
  clearButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fee2e2",
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
  },
  notificationList: {
    flex: 1,
    padding: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: "#94a3b8",
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  unreadNotification: {
    backgroundColor: "#eff6ff",
    borderLeftWidth: 4,
    borderLeftColor: "#0ea5e9",
  },
  notificationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#1e293b",
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: "#64748b",
  },
  markReadButton: {
    backgroundColor: "#0ea5e9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  markReadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});
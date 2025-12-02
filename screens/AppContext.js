// -------------------------
// File: src/context/AppContext.js
// -------------------------
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();
export function useApp() {
  return useContext(AppContext);
}

// Simple ID generator
const genId = () => `id-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

export function AppProvider({ children }) {
  // Users now include a role and additional info
  const [users, setUsers] = useState([
    // Default admin account
    { 
      name: 'admin', 
      email: 'admin@cdrrmo.gov.ph',
      contactNumber: '09123456789',
      password: 'admin123', 
      role: 'admin' 
    },
  ]);

  // SOS + Orders
  const [sosList, setSosList] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Notifications for users
  const [notifications, setNotifications] = useState({});

  // Seed sample SOS items
  useEffect(() => {
    const seed1 = {
      id: genId(),
      type: 'Medical',
      location: 'Brgy. San Isidro, 14.5910,120.9870',
      description: 'Person collapsed near market.',
      need: 'Immediate Transport',
      reporter: 'Citizen (Device)',
      reporterName: null, // No specific user for seed data
      timestamp: Date.now() - 1000 * 60 * 60,
      status: 'incoming',
    };

    const seed2 = {
      id: genId(),
      type: 'Medical',
      location: 'EUWI',
      description: 'Example validated case',
      need: 'Medical Aid',
      reporter: 'Citizen (Device)',
      reporterName: null,
      timestamp: Date.now() - 1000 * 60 * 10,
      status: 'validated',
    };

    setSosList([seed2, seed1]);
  }, []);

  // SIGN UP — default role is citizen
  function signUp({ name, email, contactNumber, password }) {
    if (users.find((u) => u.name === name))
      return { ok: false, error: 'Username already exists' };
    
    if (users.find((u) => u.email === email))
      return { ok: false, error: 'Email already registered' };

    const newUser = { 
      name, 
      email,
      contactNumber,
      password, 
      role: 'citizen' 
    };
    setUsers((p) => [newUser, ...p]);

    return { ok: true };
  }

  // LOGIN — returns role
  function login({ name, password }) {
    const user = users.find(
      (u) => u.name === name && u.password === password
    );

    if (!user) return { ok: false, error: 'Invalid credentials' };

    return {
      ok: true,
      role: user.role,
      name: user.name,
    };
  }

  // Citizen sends SOS - NOW INCLUDES reporterName
  function sendSos({ type, location, description, need, reporter, reporterName }) {
    console.log('=== SEND SOS DEBUG ===');
    console.log('reporterName received:', reporterName);
    
    const s = {
      id: genId(),
      type,
      location,
      description,
      need,
      reporter,
      reporterName, // Track which user sent this
      timestamp: Date.now(),
      status: 'incoming',
    };
    
    console.log('SOS object created:', s);
    setSosList((p) => [s, ...p]);
    return s;
  }

  // Admin validates SOS
  function validateSos(id) {
    setSosList((p) =>
      p.map((s) => (s.id === id ? { ...s, status: 'validated' } : s))
    );

    const sos = sosList.find((s) => s.id === id) || {};
    const order = {
      id: genId(),
      sosId: id,
      target: sos.type ? `${sos.type} @ ${sos.location}` : 'Unknown',
      note: 'Proceed with caution. Validate on arrival.',
      issuedTime: Date.now(),
    };

    setOrders((p) => [order, ...p]);
    return order;
  }

  // Admin dismisses SOS
  function dismissSos(id) {
    setSosList((p) =>
      p.map((s) => (s.id === id ? { ...s, status: 'dismissed' } : s))
    );
  }

  // Admin/Responder acknowledges SOS - NOW CREATES NOTIFICATION
  function acknowledgeSos(id) {
    const sos = sosList.find((s) => s.id === id);
    
    console.log('=== ACKNOWLEDGE SOS DEBUG ===');
    console.log('SOS ID:', id);
    console.log('SOS Found:', sos);
    console.log('Reporter Name:', sos?.reporterName);
    
    setSosList((p) =>
      p.map((s) =>
        s.id === id ? { ...s, status: 'acknowledged' } : s
      )
    );
    
    // Create notification for the specific user who reported
    if (sos && sos.reporterName) {
      const notificationId = genId();
      const newNotification = {
        id: notificationId,
        sosId: id,
        message: `Your ${sos.type} report at ${sos.location} has been acknowledged by responders.`,
        timestamp: Date.now(),
        read: false,
      };
      
      setNotifications((prev) => {
        const updated = {
          ...prev,
          [sos.reporterName]: [
            ...(prev[sos.reporterName] || []),
            newNotification
          ]
        };
        console.log('Updated notifications:', updated);
        return updated;
      });
      
      console.log(`✅ Citizen ${sos.reporterName} notified for SOS ID: ${id}`);
      console.log('Notification created:', newNotification);
    } else {
      console.log('⚠️ No notification created - missing reporter name');
    }
  }

  // Get notifications for a specific user
  function getNotifications(userName) {
    return notifications[userName] || [];
  }

  // Mark notification as read
  function markNotificationAsRead(userName, notificationId) {
    setNotifications((prev) => ({
      ...prev,
      [userName]: (prev[userName] || []).map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    }));
  }

  // Clear all notifications for a user
  function clearNotifications(userName) {
    setNotifications((prev) => ({
      ...prev,
      [userName]: []
    }));
  }

  return (
    <AppContext.Provider
      value={{
        users,
        signUp,
        login,
        sendSos,
        sosList,
        validateSos,
        dismissSos,
        acknowledgeSos,
        orders,
        getNotifications,
        markNotificationAsRead,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
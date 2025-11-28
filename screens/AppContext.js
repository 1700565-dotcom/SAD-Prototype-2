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
  // Users now include a role
  const [users, setUsers] = useState([
    // Default admin account
    { name: 'admin', password: 'admin123', role: 'admin' },
  ]);

  // SOS + Orders
  const [sosList, setSosList] = useState([]);
  const [orders, setOrders] = useState([]);

  // Seed sample SOS items
  useEffect(() => {
    const seed1 = {
      id: genId(),
      type: 'Medical',
      location: 'Brgy. San Isidro, 14.5910,120.9870',
      description: 'Person collapsed near market.',
      need: 'Immediate Transport',
      reporter: 'Citizen (Device)',
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
      timestamp: Date.now() - 1000 * 60 * 10,
      status: 'validated',
    };

    setSosList([seed2, seed1]);
  }, []);

  // SIGN UP — default role is citizen
  function signUp({ name, password }) {
    if (users.find((u) => u.name === name))
      return { ok: false, error: 'User already exists' };

    const newUser = { name, password, role: 'citizen' };
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

  // Citizen sends SOS
  function sendSos({ type, location, description, need, reporter }) {
    const s = {
      id: genId(),
      type,
      location,
      description,
      need,
      reporter,
      timestamp: Date.now(),
      status: 'incoming',
    };
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

  // Admin acknowledges SOS
  function acknowledgeSos(id) {
    setSosList((p) =>
      p.map((s) =>
        s.id === id ? { ...s, status: 'acknowledged' } : s
      )
    );
    console.log(`Citizen notified for SOS ID: ${id}`);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
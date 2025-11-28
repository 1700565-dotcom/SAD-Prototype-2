// -------------------------
// File: App.js
// -------------------------
import React, { useState } from 'react';
import { AppProvider } from './screens/AppContext';

import LandingScreen from './screens/LandingScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';

// IMPORT NEW DASHBOARDS
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import CitizenDashboardScreen from './screens/CitizenDashboardScreen';

// Original screens (now included via the dashboards) are no longer needed here
// import ReporterScreen from './screens/ReporterScreen';
// import AdminScreen from './screens/AdminScreen';

export default function App() {
  const [screen, setScreen] = useState('Landing');
  const [role, setRole] = useState(null);
  const [currentUserName, setCurrentUserName] = useState('');

  // Global navigation function
  function go(to, opts) {
    setScreen(to);

    if (opts?.role) setRole(opts.role);
    // When logging out, clear role and name
    if (to === 'Login') {
      setRole(null);
      setCurrentUserName('');
    } else if (opts?.name !== undefined) {
      setCurrentUserName(opts.name);
    }
  }

  return (
    <AppProvider>
      {/* LANDING SCREEN */}
      {screen === 'Landing' && (
        <LandingScreen
          onSignup={() => go('Signup')}
          onLogin={() => go('Login')}
        />
      )}

      {/* SIGNUP - FIX APPLIED HERE */}
      {screen === 'Signup' && (
        <SignupScreen
          // This is called when the user successfully signs up (navigates to login)
          onSignedUp={() => go('Login')}
          // FIX: This is called when the user presses "Already have an account? Login"
          onLogin={() => go('Login')} 
        />
      )}

      {/* LOGIN */}
      {screen === 'Login' && (
        <LoginScreen
          onLogin={(name, userRole) =>
            go('Dashboard', { name, role: userRole })
          }
          onSignup={() => go('Signup')}
        />
      )}

      {/* DASHBOARD — Role Based */}
      {screen === 'Dashboard' &&
        (role === 'admin' ? (
          <AdminDashboardScreen
            name={currentUserName}
            // Logout returns to Login screen
            onBack={() => go('Login')}
          />
        ) : (
          <CitizenDashboardScreen
            name={currentUserName}
            // Logout returns to Login screen
            onBack={() => go('Login')}
          />
        ))}
    </AppProvider>
  );
}
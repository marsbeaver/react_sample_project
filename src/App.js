import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/errorBoundaries/errorBoundaries';
import Dashboard from './dashboard/dashboard';
import Home from './home';
import Login from './login/login';
import { LoginProvider } from './login/loginContext';
import Signup from './signup/signup';
import { SignupProvider } from './signup/signupContext';
import { Suspense } from 'react';
function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ErrorBoundary fallback={<p>Somthing went wrong</p>}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={
              <SignupProvider>
                <Signup />
              </SignupProvider>
            } />
            <Route path="/login" element={
              <LoginProvider>
                <Login />
              </LoginProvider>
            } />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </Router>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;

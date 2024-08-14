import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from "./contexts/AuthContext";
import ErrorMessage from "./components/auth/ErrorMessage";
import ErrorPage from "./pages/error-page/error-page";
import AboutUs from './pages/about-us/about-us';
import Collaboration from './pages/collaboration/collaboration';
import { Note } from './pages/editor/editor';
import HomeScreen from './pages/home/Home';
import { Notes } from './pages/notes/notes';
import Profile from './pages/profile/profile';
import Login from './pages/auth-pages/login';
import Register from './pages/auth-pages/register';
import NewProfile from './pages/edit-profile/EditProfile';
import PrivateRoute from './components/auth/PrivateRoute';
// Delete later
import Testing from './pages/testing';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/collaboration" element={<PrivateRoute><Collaboration /></PrivateRoute>} />
        <Route path="/note" element={<PrivateRoute><Note /></PrivateRoute>} />
        <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-profile" element={<PrivateRoute><NewProfile /></PrivateRoute>} />
        <Route path="/testing" element={<Testing />}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ErrorMessage />
    </AuthProvider>
  );
}

export default App;

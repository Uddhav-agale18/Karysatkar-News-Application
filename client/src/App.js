import React, { useState, useEffect } from "react";
import '@coreui/coreui/dist/css/coreui.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Home from "./components/Home";
import MarathiNews from "./components/MarathiNews";
import Politics from "./components/Politics";
import Gallery from "./components/Gallery";
import Jalna from "./components/Jalna";
import Beed from "./components/Beed";
import Farming from "./components/Farming";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AdminPanel from './AdminPanel/AdminPanel';
import Environment from "./components/Environment";
import Categories from './pages/Categories';
import Navigation from './pages/Navigation/Navigation';
import Themes from './pages/Themes';
import Pages from './pages/Pages';
import AddPost from './pages/Post/AddPost';
import BulkPostsUpload from './pages/BulkPostsUpload';
import Settings from './pages/Setting/Settings';
import Layout from "./AdminPanel/Layout";
import NewsLetter from "./pages/NewsLetter";
import Widgets from "./pages/Widgets";
import NavBar from "./header/NavBar";
import Polls from "./pages/Polls/Polls";
import EditMenuLink from "./pages/Navigation/EditMenuLink";
import Posts from "./pages/Post/Posts";
import PostDetail from "./components/PostDetail";
import ChangeProfile from "./pages/Setting/ChangeProfile";
import Language from "./pages/Setting/Language";
import ContactSettings from "./pages/Setting/ContactSettings";
import SocialMediaSettings from "./pages/Setting/SocialMediaSettings";
import Footer from './components/Footer';
import UploadEpaper from "./pages/epaper/UploadEpaper";
import Epaper from "./components/Epaper";
import AdminLogin from "./pages/adminLogin/AdminLogin";

// PrivateRoute Component to protect admin routes
const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('adminToken'); // Check if the token exists in localStorage
    return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

const AppContent = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const [logo, setLogo] = useState('default-logo-url.png');

    // Function to update the logo, passed to ChangeProfile component
    const handleLogoChange = (newLogoUrl) => {
        setLogo(newLogoUrl);
    };

    const addPost = (newPost) => {
        console.log('New post added:', newPost);
    };

    return (
        <>
            {/* Show NavBar on non-admin routes */}
            {!isAdminRoute && <NavBar logo={logo} />} 
            <Routes>
                {/* Public Routes */}
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/login" element={<AdminLogin />} /> 
                <Route path="/marathi-news" element={<MarathiNews />} />
                <Route path="/post/:postId" element={<PostDetail />} />
                <Route path="/politics" element={<Politics />} />
                <Route path="/jalna-district" element={<Jalna />} />
                <Route path="/beed-district" element={<Beed />} />
                <Route path="/weather" element={<Environment />} />
                <Route path="/agriculture" element={<Farming />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/e-paper" element={<Epaper />} />

                {/* Admin Layout and Protected Routes */}
                <Route path="/" element={<Layout />} >
                    <Route path="/admin/" element={
                        <PrivateRoute><AdminPanel /></PrivateRoute>
                    } />
                    <Route path="/admin/navigation" element={
                        <PrivateRoute><Navigation /></PrivateRoute>
                    } />
                    <Route path="/admin/navigation/edit-menu-link/:label" element={
                        <PrivateRoute><EditMenuLink /></PrivateRoute>
                    } />
                    <Route path="/admin/themes" element={
                        <PrivateRoute><Themes /></PrivateRoute>
                    } />
                    <Route path="/admin/pages" element={
                        <PrivateRoute><Pages /></PrivateRoute>
                    } />
                    <Route path="/admin/polls" element={
                        <PrivateRoute><Polls /></PrivateRoute>
                    } />
                    <Route path="/admin/bulk-post-upload" element={
                        <PrivateRoute><BulkPostsUpload /></PrivateRoute>
                    } />
                    <Route path="/admin/add-post" element={
                        <PrivateRoute><AddPost addPost={addPost} /></PrivateRoute>
                    } />
                    <Route path="/admin/posts" element={
                        <PrivateRoute><Posts /></PrivateRoute>
                    } />
                  
                    
                    <Route path="/admin/epaper" element={
                        <PrivateRoute><UploadEpaper /></PrivateRoute>
                    } />
                    <Route path="/admin/categories" element={
                        <PrivateRoute><Categories /></PrivateRoute>
                    } />
                    <Route path="/admin/newsletter" element={
                        <PrivateRoute><NewsLetter /></PrivateRoute>
                    } />
                    <Route path="/admin/widgets" element={
                        <PrivateRoute><Widgets /></PrivateRoute>
                    } />
                    <Route path="/admin/settings" element={
                        <PrivateRoute><Settings /></PrivateRoute>
                    } />
                    <Route path="/admin/settings/language" element={
                        <PrivateRoute><Language /></PrivateRoute>
                    } />
                    <Route path="/admin/settings/logo" element={
                        <PrivateRoute><ChangeProfile onLogoChange={handleLogoChange} /></PrivateRoute>
                    } />
                    <Route path="/admin/settings/contact" element={
                        <PrivateRoute><ContactSettings /></PrivateRoute>
                    } />
                    <Route path="/admin/settings/social-media" element={
                        <PrivateRoute><SocialMediaSettings /></PrivateRoute>
                    } />
                </Route>

                {/* Redirect from root path */}
                <Route path="/home" element={<Navigate to="/" replace />} />
            </Routes>
            {/* Show Footer on non-admin routes */}
            {!isAdminRoute && <Footer />}
        </>
    );
};

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;

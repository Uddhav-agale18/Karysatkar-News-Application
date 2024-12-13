import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AddPost from '../pages/Post/AddPost';
import ChangeProfile from '../pages/Setting/ChangeProfile';
import Logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './NavBar.css'
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [isAddPostVisible, setIsAddPostVisible] = useState(false);
    const [isChangeProfileVisible, setIsChangeProfileVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    const [logoUrl, setLogoUrl] = useState(Logo);

    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [categoryPosts, setCategoryPosts] = useState([]);

    const navLinks = [
        { path: "/", label: "HOME" },
        { path: "/marathi-news", label: "मराठी बातम्या", category: "marathi-news" },
        { path: "/politics", label: "राजकीय", category: "politics" },
        { path: "/jalna-district", label: "जालना-जिल्हा", category: "jalna-district" },
        { path: "/beed-district", label: "बीड जिल्हा", category: "beed-district" },
        { path: "/weather", label: "हवामान", category: "weather" },
        { path: "/agriculture", label: "शेती विशेष", category: "agriculture" },
        { path: "/gallery", label: "GALLERY" },
        { path: "/e-paper", label: "E-PAPER" }
    ];

    const fetchPostsForCategory = async (category) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/posts?category=${category}`);
            setCategoryPosts(response.data.posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleMouseEnter = (category) => {
        setHoveredCategory(category);
        fetchPostsForCategory(category);
    };

    const handleMouseLeave = () => {
        setHoveredCategory(null);
        setCategoryPosts([]);
    };

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile');
                if (response.data && response.data.profile && response.data.profile.logo) {
                    setLogoUrl(response.data.profile.logo);
                }
            } catch (error) {
                console.error('Error fetching logo:', error);
            }
        };
        fetchLogo();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery}`);
        setShowSearchInput(false);
    };

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleSearchInput = () => setShowSearchInput(!showSearchInput);
    const toggleAddPost = () => setIsAddPostVisible(!isAddPostVisible);
    const toggleChangeProfile = () => setIsChangeProfileVisible(!isChangeProfileVisible);
    const addPost = (postDetails) => setPosts([...posts, postDetails]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // On component mount, check for a saved theme preference
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.documentElement.setAttribute("data-theme", savedTheme);
            setIsDarkMode(savedTheme === "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme); // Save user preference
    };

    return (
        <header className="relative z-50">
            <marquee behavior="scroll" direction="left" className="marquee-text bg-orange-400 text-white z-10 p-1">
                RNI MAHMAR/2023/84609
            </marquee>
            <nav className="bg-white z-20 relative border-b-4 border-blue-950">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="sm:hidden">
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="text-gray-400 hover:text-gray-500 focus:outline-none ml-4"
                                aria-label="Toggle Menu"
                            >
                                <FontAwesomeIcon icon={faBars} className="h-6 w-6" /> {/* Menu icon added here */}
                            </button>
                        </div>
                        <div className="flex-shrink-0">
                            <img src={logoUrl} alt="Logo" className="h-10 w-auto ml-0" />
                        </div>


                        {/* Desktop menu */}
                        <div className={`hidden sm:flex sm:space-x-3 items-center`}>
                            {navLinks.map((link) => (
                                <div
                                    key={link.path}
                                    className="relative group"
                                    onMouseEnter={() => handleMouseEnter(link.category)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <NavLink
                                        to={link.path}
                                        className="text-blue-950 hover:text-blue-400 px-2 py-2 rounded-md text-sm font-bold no-underline "
                                        activeClassName="text-blue-600 font-semibold"
                                    >
                                        {link.label}
                                    </NavLink>
                                    {hoveredCategory === link.category && categoryPosts.length > 0 && (
                                        <div className="absolute top-full w-96 left-0 flex flex-col bg-black shadow-lg p-4 border border-gray-300 z-50 no-underline mt-2">
                                            {categoryPosts.map((post) => (
                                                <ul key={post.id}>
                                                    <li>
                                                        {/* Ensure the Link is correctly pointing to the post's unique URL */}
                                                        <Link className="text-sm mt-2 text-white">
                                                            {post.title}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                        {/* Search and login buttons */}
                        <div className="relative flex items-center">
                            <button onClick={toggleSearchInput} className="text-gray-400 hover:text-gray-500 mr-4">
                                <FontAwesomeIcon icon={faSearch} className="h-6 w-6" />
                            </button>
                            {showSearchInput && (
                                <div className="absolute top-12 right-0 sm:right-0 flex bg-white border border-gray-300 shadow-lg rounded-lg p-2 z-10">
                                    <form onSubmit={handleSearch} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            className="bg-gray-100 h-10 px-4 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none w-64"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg ">
                                            Search
                                        </button>
                                    </form>
                                </div>
                            )}
                            <div className="hidden sm:flex ml-4 space-x-2">
                                <Link
                                    to="/login"
                                    className="block text-black px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white flex items-center ml-4"
                                >
                                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {isAddPostVisible && <AddPost addPost={addPost} />}
            {isChangeProfileVisible && <ChangeProfile onLogoChange={setLogoUrl} onClose={toggleChangeProfile} />}

            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`}
                onClick={toggleMenu}
            ></div>

            <div
                className={`fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex flex-col h-full overflow-y-auto">
                    <button onClick={toggleMenu} className="p-2 text-black bg-red-400 hover:bg-gray-200 font-bold">
                        CLOSE
                    </button>
                    <div className="flex flex-col p-2 ml-6 space-y-4">
                        {/* Login button in mobile menu */}
                        <Link
                            to="/login"
                            className="block text-black bg-blue-500 text-white text-sm font-medium rounded-md flex items-center justify-center w-24 mt-2 hover:bg-blue-600 transition duration-200 h-8 no-underline"
                            onClick={toggleMenu} // Close the menu on click
                        >
                            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                            Login
                        </Link>

                        {/* Mobile menu links */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-black py-1 no-underline group relative flex items-center"
                                onClick={toggleMenu} // Close the menu on click
                            >
                                <span className="transition-all text-blue-950 group-hover:text-blue-500 font-bold">
                                    {link.label}
                                </span>
                                {/* Underline animation */}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                            </Link>
                        ))}


                        {/* Dark mode toggle button */}
                        <button onClick={toggleTheme} className="theme-toggle-btn mt-4 ">
                            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        </button>
                    </div>
                </div>
            </div>

        </header>

    );
};

export default NavBar;

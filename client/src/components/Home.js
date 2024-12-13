import React from 'react';
import BreakingNews from './BreakingNews';
import LatestPosts from './LatestPosts';
import SidebarPolls from './SidebarPolls';

const Home = () => {
    const newsItems = [
        'Earthquake in City A, magnitude 6.5',
        'New government policies announced',
        'Local team wins championship',
        'Economic updates: Stock market rises',
        'Weather forecast: Sunny days ahead',
    ];

    return (
        <div>
            <BreakingNews news={newsItems} />
           
            <div className="container-fluid flex flex-col md:flex-row mt-0">
                {/* Sidebar Polls - positioned on the left side */}
                <SidebarPolls />
                
                {/* Latest Posts - positioned on the right side */}
                <div className="md:w-2/3 w-full">
                    <LatestPosts />
                </div>
            </div>
        </div>
    );
};

export default Home;

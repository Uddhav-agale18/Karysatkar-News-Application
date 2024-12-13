import React from 'react';

const Gallery = () => {
    // Sample data for news articles
    const newsArticles = [
        {
            id: 1,
            title: "News Article 1",
            description: "This is a brief description of news article 1.",
            imgSrc: "https://via.placeholder.com/300", // Replace with your image URLs
        },
        {
            id: 2,
            title: "News Article 2",
            description: "This is a brief description of news article 2.",
            imgSrc: "https://via.placeholder.com/300",
        },
        {
            id: 3,
            title: "News Article 3",
            description: "This is a brief description of news article 3.",
            imgSrc: "https://via.placeholder.com/300",
        },
        {
            id: 4,
            title: "News Article 4",
            description: "This is a brief description of news article 4.",
            imgSrc: "https://via.placeholder.com/300",
        },
        // Add more news articles as needed
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">News Gallery</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {newsArticles.map((article) => (
                    <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={article.imgSrc}
                            alt={article.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{article.title}</h2>
                            <p className="text-gray-600">{article.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;

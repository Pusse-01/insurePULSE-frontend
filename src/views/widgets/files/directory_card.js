import React, { useState } from 'react';

function DirectoryCard({ name, lastUpdated, onClick }) {
    // Parse the ISO date string
    const [showFiles, setShowFiles] = useState(false);
    const date = new Date(lastUpdated);

    // Options for date and time formatting
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const handleCardClick = () => {
        setShowFiles(!showFiles);
        onClick(name); // Notify the parent component about the card click
    };
    // Format the date using the options
    const formattedDate = date.toLocaleString(undefined, options);

    return (
        <div
            className="bg-white p-4 rounded shadow mx-4 text-left"
            style={{ cursor: 'pointer' }}
            onClick={handleCardClick}
        >
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-500">Last Modified: {formattedDate}</p>
            {showFiles && (
                <div>
                    {/* Render the files inside the directory here */}
                    <p>List of files...</p>
                </div>
            )}
        </div>
    );
}

export default DirectoryCard;

import React from 'react';

const ThemePage = () => {
    return (
        <div className="audio-page">
            <h1>Theme Settings</h1>
            <p>Select your preferred theme:</p>
            <button>Day Mode</button>
            <button>Night Mode</button>
            <style jsx>{`
                .audio-page {
                    padding: 20px;
                    background-color: grey;
                    border-radius: 10px;
                    max-width: 600px;
                    margin: auto;
                }

                h1 {
                    text-align: center;
                }

                button {
                    margin: 10px;
                    padding: 10px 20px;
                    font-size: 1rem;
                    border-radius:12px;
                }

                button:hover {
                    background-color: orange;
                    color: #fff;
                }
            `}</style>
        </div>
    );
};

export default ThemePage;

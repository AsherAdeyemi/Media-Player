// src/comp
import React from 'react';

const EqualizerPage = () => {
    return (
        <div className="audio-page">
            <h1>Equalizer Settings</h1>
            <p>Adjust audio settings:</p>
            <label>Bass</label>
            <input type="range" min="0" max="100" />
            <label>Treble</label>
            <input type="range" min="0" max="100" />
            <label>Balance</label>
            <input type="range" min="0" max="100" />
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

                p {
                    text-align: center;
                    margin-bottom: 20px;
                }

                label {
                    margin: 10px 0;
                    font-size: 1rem;
                }

                input[type="range"] {
                    width: 100%;
                    margin-bottom: 20px;
                }

                li {
                    padding: 10px;
                    border: 1px solid #ccc;
                    margin: 5px 0;
                    border-radius: 5px;
                    background-color: orange;
                    display: flex; 
                    align-items: center; 
                }

                li:hover {
                    background-color: #e0e0e0;
                    transform: scale(1.05); /* Increase size on hover */
                }

                .icon {
                    margin-right: 10px;
                }

                .blinking-alert {
                    font-weight: bold;
                    color: red;
                    animation: blink-animation 1.5s infinite;
                    text-align: center;
                    margin-top: 10px;
                }

                .glow-button {
                    border: none; 
                    background-color: #ff3737;  /* Red scan button */
                    padding: 10px 20px; 
                    border-radius: 5px; 
                    cursor: pointer; 
                    color: white; 
                    font-weight: bold;
                    position: relative;
                    overflow: hidden;
                    display: block; /* Center the button */
                    margin: 20px auto; /* Center the button horizontally */
                }
            `}</style>
        </div>
    );
};

export default EqualizerPage;

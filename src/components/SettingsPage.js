// src/components/SettingsPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
    return (
        <div className="settings-page">
            <h1>Settings</h1>
            <ul>
                <li>
                    <Link to="/settings/theme">Theme (Night/Day Mode)</Link>
                </li>
                <li>
                    <Link to="/settings/equalizer">Equalizer</Link>
                </li>
            </ul>
            <style jsx>{`
                .settings-page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background-color: #f5f5f5;
                }

                h1 {
                    margin-bottom: 20px;
                }

                ul {
                    list-style: none;
                    padding: 0;
                }

                li {
                    margin: 10px 0;
                }

                a {
                    text-decoration: none;
                    color: #007bff;
                    font-size: 1.2rem;
                }

                a:hover {
                    color: #0056b3;
                }
            `}</style>
        </div>
    );
};

export default SettingsPage;

import React, { useState } from 'react';
import axiosApi from '../axiosApi';

const ShortUrlForm: React.FC = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenUrl, setShortenUrl] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axiosApi.post('/links', { originalUrl });
            setShortenUrl(response.data.shortenUrl);
        } catch (error) {
            console.error('shortening URL is failed:', error);
        }
    };

    return (
        <div>
            <h1>Shorten your link!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="originalUrl">Original URL:</label>
                    <input
                        type="text"
                        id="originalUrl"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Shorten!</button>
            </form>
            {shortenUrl && (
                <div>
                    <h2>Your shortened URL:</h2>
                    <a href={`/${shortenUrl}`} >
                       {shortenUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default ShortUrlForm;

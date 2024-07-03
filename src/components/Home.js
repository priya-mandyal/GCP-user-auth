import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert('Please select an image');
            return;
        }

        setUploading(true);

        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const formData = {
                    body: reader.result.split(',')[1],
                };
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const fileName = image.name;
                const apiUrl = 'https://us-central1-csci-5411.cloudfunctions.net/upload-pfp-image';
                const queryParams = `?filename=${encodeURIComponent(fileName)}`;
                const url = apiUrl + queryParams;

                await axios.post(url, formData, config);

                const uploadedImageUrl = `https://storage.cloud.google.com/act-2-user-images/${fileName}`;

                await saveImageUrlToDynamoDB(uploadedImageUrl);

                setImageUrl(uploadedImageUrl);
                setMessage('Image uploaded successfully.');
            };
            reader.readAsDataURL(image);
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage('Error uploading image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const saveImageUrlToDynamoDB = async (imageUrl) => {
        try {
            const savedUsername = localStorage.getItem('username');
            console.log(savedUsername);
            if (!savedUsername) {
                throw new Error('Username not found in local storage');
            }
            const requestBody = {
                username: savedUsername,
                profile_url: imageUrl
            };
            await axios.post('https://us-central1-csci-5411.cloudfunctions.net/saveURL', requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage('Image uploaded and URL saved to DynamoDB successfully.');
        } catch (error) {
            console.error('Error saving image URL to DynamoDB:', error);
            setMessage('Error saving image URL to DynamoDB. Please try again.');
        }
    };

    return (
        <div>
            {(
                <h1>{`${localStorage.getItem('username')}'s profile page`}</h1>
            )}
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="imageUpload">Upload Image:</label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    <button type="submit" disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
                <div>{message}</div>
                {imageUrl && (
                    <div style={{ marginTop: '20px' }}>
                        <br />
                        <p>Download image:
                        <a
        href={imageUrl}
        download={image.name}
        style={{
            display: 'inline-block',
            backgroundColor: 'white',
            color: 'blue',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
            marginLeft: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
        }}
    >
        <span style={{ marginRight: '10px' }}>Download your image!</span>
         </a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

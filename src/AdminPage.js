import React, { useState } from 'react';

function AdminPage() {
    const [title, setTitle] = useState('');
    const [blogDateTime, setBlogDateTime] = useState('');
    const [content1, setContent1] = useState('');
    const [content2, setContent2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const blogData = {
            Title: title,
            BlogDateTime: blogDateTime,
            Content1: content1,
            Content2: content2,
        };

        fetch('/api/blogpage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Blog post created with ID:', data.BlogId);
            // 폼 리셋
            setTitle('');
            setBlogDateTime('');
            setContent1('');
            setContent2('');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h1>Add New Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Blog Date and Time:</label>
                    <input
                        type="datetime-local"
                        value={blogDateTime}
                        onChange={(e) => setBlogDateTime(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content 1:</label>
                    <textarea
                        value={content1}
                        onChange={(e) => setContent1(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content 2:</label>
                    <textarea
                        value={content2}
                        onChange={(e) => setContent2(e.target.value)}
                    />
                </div>
                <button type="submit">Add Blog Post</button>
            </form>
        </div>
    );
}

export default AdminPage;

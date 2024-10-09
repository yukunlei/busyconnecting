import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AvailableBlogs.css';
import Card from "./Card";

function AvailableBlogs() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetch('/api/blogPage/latestBlogs')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBlogs(data); // Set blogs state with the array of blog objects
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    const getImageUrl = (base64) => {
        return base64 ? `data:image/jpeg;base64,${base64}` : ''; // Adjust MIME type if necessary
    };

    const handleCardClick = (id) => {
        navigate(`/blog/${id}`); // Navigate to the BlogDetail page with the blog ID
    };

    return (
        <section className="grants-tenders">
            <h1>Latest Blogs</h1>
            <div className="card-container">
                {blogs.map((blog) => (
                    <Card
                        key={blog.BlogId}
                        title={blog.Title}
                        date={new Date(blog.BlogDateTime).toLocaleString()}
                        description={blog.Content1}
                        image={getImageUrl(blog.Image)}
                        onClick={() => handleCardClick(blog.BlogId)} // Add onClick handler
                    />
                ))}
            </div>
            <button className="all-grants-btn">
                <a className="link" href="/blog">Show All Blogs</a>
            </button>
        </section>
    );
}

export default AvailableBlogs;

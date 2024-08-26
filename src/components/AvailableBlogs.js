import React, { useEffect, useState } from 'react';
import './AvailableBlogs.css';
import Card from "./Card";

function AvailableBlogs() {
    // State to hold the blog data
    const [blogs, setBlogs] = useState([]);

    // Fetch the blog data when the component mounts
    useEffect(() => {
        fetch('/api/latest-blogs')
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

    // Function to convert BLOB to URL if needed
    const getImageUrl = (blob) => {
        return blob ? URL.createObjectURL(new Blob([blob])) : '';
    };

    return (
        <section className="grants-tenders">
            <h1>Latest Blogs</h1>
            <div className="card-container">
                {blogs.map((blog) => (
                    <Card
                        key={blog.BlogId} // Use blog.BlogId
                        title={blog.Title}
                        date={new Date(blog.BlogDateTime).toLocaleString()}
                        description={blog.Content1}
                        image={getImageUrl(blog.Image)} // Convert BLOB to URL if necessary
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

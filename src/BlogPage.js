import React, { useEffect, useState } from 'react';
import "./Blog.css";
import Card from "./components/Card";

function BlogPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/api/blogpage')
            .then(response => response.json())
            .then(data => {
                setBlogs(data.data); // Assuming your API returns data as { "data": rows }
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            <div className="blog-container">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog.BlogId} className="blog-post">
                            <Card
                                title={blog.Title}
                                date={new Date(blog.BlogDateTime).toLocaleString()}
                                description={blog.Content1}
                            />
                        </div>

                        // <div key={blog.BlogId} className="blog-post">
                        //     <h2>{blog.Title}</h2>
                        //     <p>{new Date(blog.BlogDateTime).toLocaleString()}</p>
                        //     <p>{blog.Content1}</p>
                        //     <p>{blog.Content2}</p>
                        // </div>

                    ))
                ) : (
                    <p>No blog posts available.</p>
                )}
            </div>

        </div>
    );
}

export default BlogPage;

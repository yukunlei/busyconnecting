import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./BlogPage.css";
import "./Global.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SmallerCard from "./components/SmallerCard";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./Footer";

function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/blogPage/getAllBlog')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length) {
                    setBlogs(data);
                    setFilteredBlogs(data);
                } else {
                    console.error('Unexpected data format or empty data:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm) {
            const filtered = blogs.filter(blog =>
                blog.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.Content1.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBlogs(filtered);
        } else {
            setFilteredBlogs(blogs);
        }
    };

    const handleBlogClick = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <div>
            <Header />
            <h1 className="title">Blogs</h1>
            <SearchBar placeholder={"Search Blog"} onSearch={handleSearch} />
            <div className="blog-container">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <div key={blog.BlogId} className="blog-post" onClick={() => handleBlogClick(blog.BlogId)}>
                            <SmallerCard
                                title={blog.Title}
                                date={new Date(blog.BlogDateTime).toLocaleDateString()}
                                description={blog.Content1}
                                imageUrl={blog.Image}
                            />
                        </div>
                    ))
                ) : (
                    <p>No blog posts available.</p>
                )}
            </div>
            <div className="button-container">
                <h2 className="txt">Want to know more?</h2>
                <RedButton text={"Book a consultation"} />
            </div>
            <Newsletter />
            <Footer />
        </div>
    );
}

export default BlogPage;

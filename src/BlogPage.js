import React, { useEffect, useState } from 'react';
import "./BlogPage.css";
import "./Global.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SmallerCard from "./components/SmallerCard";
import RedButton from "./components/RedButton";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

function BlogPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/api/blogpage')
            .then(response => response.json())
            .then(data => {
                setBlogs(data.data);
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    return (
        <div>
            <Header/>
            <h1 className="title"> Blogs</h1>
            <SearchBar placeholder={"Search Blog"} />
            <div className="blog-container">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog.BlogId} className="blog-post">
                            <SmallerCard
                                title={blog.Title}
                                date={new Date(blog.BlogDateTime).toLocaleString()}
                                description={blog.Content1}
                            />
                        </div>

                    ))
                ) : (
                    <p>No blog posts available.</p>
                )}
            </div>
            <div className="button-container">
                <h2 className="txt">Want to know more?</h2>
                <RedButton text={"Book a consultation"}/>
            </div>
            <Newsletter/>
            <Footer/>
        </div>
    );
}

export default BlogPage;

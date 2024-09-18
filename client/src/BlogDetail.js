import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './Footer';
import Newsletter from "./components/Newsletter";
import RedButton from "./components/RedButton";
import "./BlogDetail.css";

function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetch(`/api/blogPage/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBlog(data);
            })
            .catch(error => {
                console.error('Error fetching blog details:', error);
            });
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header/>
            <div className="wrapper">
                <h1>{blog.Title}</h1>
                <div className="blog-detail">
                    {blog.Image && (
                        <img className="imageBlog" src={`data:image/jpeg;base64,${blog.Image}`} alt={blog.Title}/>
                    )}
                    <p>{new Date(blog.BlogDateTime).toLocaleString()}</p>
                    <div>{blog.Content1}</div>
                    <div>{blog.Content2}</div>
                </div>
                <div className="button-container">
                    <h2 className="txt">Want to know more?</h2>
                    <RedButton text={"Book a consultation"}/>
                </div>
            </div>

            <Newsletter/>
            <Footer/>
        </div>
    );
}

export default BlogDetail;

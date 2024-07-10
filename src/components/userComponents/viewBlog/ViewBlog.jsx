import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { viewBlog } from '../../../api/userApi'
import './ViewBlog.css'
import { ThreeDots } from 'react-loader-spinner'

function ViewBlog() {
    const { id } = useParams()
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                setIsLoading(true);
                const response = await viewBlog(id)
                setBlog(response.data.blog)
            } catch (error) {
                console.error('Error fetching blog details', error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchBlogDetails();
    }, [id])

    if (isLoading) {
        return (
            <div className="loader-container">
                <ThreeDots color="#d6fb00" height={80} width={80} />
            </div>
        );
    }

    if (!blog) return <div>Blog not found</div>

    return (
        <div className="view-blog-container">
            <div className="view-blog-content">
                <div className="view-blog-image">
                    {blog.images && blog.images.length > 0 && (
                        <img src={blog.images[0]} alt={blog.blogName} />
                    )}
                </div>
                <div className="view-blog-info">
                    <h2 className="view-blog-title">{blog.blogName}</h2>
                    <div className="view-blog-difficulty">
                        Difficulty: {blog.difficulty || 'Not specified'}
                    </div>
                    <div className="view-blog-description">
                        <h3>Description:</h3>
                        <p>{blog.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBlog
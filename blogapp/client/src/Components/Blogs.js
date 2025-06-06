import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { getBlogs, likeBlog } from "../Features/BlogSlice";
import { FaHeart } from "react-icons/fa";
import moment from "moment";

const Blogs = () => {
    const user = useSelector((state) => state.users.user);
    const blogs = useSelector((state) => state.blogs.blogs);

    const dispatch = useDispatch();

    const handleGetBlogs = async () => {
        try {
            await dispatch(getBlogs());
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleGetBlogs();
    }, []);

    const handleBlogLike = (blogID) => {
        const blogData = {
            blogID: blogID,
            userID: user._id,
        };
        dispatch(likeBlog(blogData));
    };

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th><h4>Blog</h4></th>
                        <th><h4>Like</h4></th>
                    </tr>
                </thead>
                <tbody>
                    {blogs && blogs.map((blog) => (
                        <tr key={blog._id}>
                            <td>
                                <p>{blog.blogContent}</p>
                                <p>{blog.bloggedBy}</p>
                                <p>{moment(blog.createdAt).fromNow()}</p>
                            </td>
                            <td>
                                <a href="#" onClick={() => handleBlogLike(blog._id)}>
                                    <FaHeart />
                                </a>
                                {' '}{blog.likes.count}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Blogs;
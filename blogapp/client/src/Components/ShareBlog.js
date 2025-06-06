import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { shareBlog } from "../Features/BlogSlice";

const ShareBlog = () => {
    const user = useSelector((state) => state.users.user);

    const dispatch = useDispatch();

    const [blogContent, setBlogContent] = useState("");

    const handleShare = () => {
        const blogDate = {
            blogContent: blogContent,
            bloggedBy: user.email,
        };
        dispatch(shareBlog(blogDate));
        setBlogContent("");
    };

    return (
        <Form>
            <FormGroup>
                <Label for="blogContent">Blog Content</Label>
                <Input type="textarea" id="blogContent" onChange={(e) => setBlogContent(e.target.value)}/>
            </FormGroup>
            <Button onClick={handleShare}>Share</Button>
        </Form>
    );
}

export default ShareBlog;
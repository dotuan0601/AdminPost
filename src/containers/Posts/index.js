import React, {useState} from 'react';
import List from "./List";
import Form from "./Form";
import './Posts.css';

const Posts = () => {
    return (
        <div>
            <Form />
            <List />
        </div>
    )
};

export default Posts;

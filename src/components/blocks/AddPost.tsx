import React, {useState, useEffect} from 'react'
import axios from 'axios';
import server from '../config/config';

function AddPosts() {
    const [postValues, setPostValues] = useState({
        author: "",
        content: "",    
        title:""
    })
    function handlePostChange(event) {
        setPostValues({...postValues, [event.target.name]: event.target.value})
    }
    function addPost() {
       axios.post(`${server}addPost.php`, JSON.stringify(postValues))
       .then(res => console.log(res))
       window.location.reload()

    }
  return (
      <>
        <div>Add Post: </div>
            <label> Post Title: </label>  <input onChange={handlePostChange} name="content"></input>
            <label> Post Content: </label> <input onChange={handlePostChange} name="title"></input>
            <label> Your name: </label> <input onChange={handlePostChange} name="author"></input>
            <button onClick={addPost}> Add </button>
        <h1> Posts</h1>
     </>
  )
}

export default AddPosts
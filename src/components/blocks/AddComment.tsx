import React, {useState, useEffect} from 'react'
import axios from 'axios';
import server from '../config/config';

function AddComment({PostId}) {
    const [commentValues, setCommentValues] = useState({
        author: "",
        content: "",    
        postId: 0
    })
    function handleCommentChange(event) {
        setCommentValues({...commentValues, [event.target.name]: event.target.value})
    }
    function addComment(event) {
        setCommentValues(({...commentValues, postId: event.target.id}))
        const obj = {
            author: commentValues.author,
            content: commentValues.content,
            postId: Number(event.target.id)
        }
       axios.post(`${server}addComment.php`, JSON.stringify(obj))
       .then(res => console.log(res))
       window.location.reload()
    }

  return (
    <>
    <div> Add comment: </div>
    Your comment: <textarea onChange={handleCommentChange} name="content"></textarea>
    Your name: <input onChange={handleCommentChange} name="author"></input>
    <button id={PostId} onClick={addComment}> Add </button>
    </>
  )
}

export default AddComment
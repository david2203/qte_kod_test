import React, {useState, useEffect} from 'react'
import axios from 'axios';
import server from '../config/config';



function Home() {
    const instance = axios.create({ baseURL: server })
    
    const useGetData = () => {
        const [postArray, setPostsArray] = useState([])
        const [commentArray, setCommentArray] = useState([])

        const [loading, setLoading] = useState(true)
        const fetchData = async () => {
            try {
                const response = await axios.get(`${server}getPosts.php`)
                if(response.data !== "0 results") {
                    setPostsArray(response.data.posts)
                    setCommentArray(response.data.comments)
                }
                
                
            } catch (err) {
                console.log(err)
            }

            setLoading(false)


        }
        useEffect(() => {
            fetchData()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        return {postArray,commentArray , loading }

    }
    const { loading, postArray, commentArray } = useGetData()
    
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
    <div className="post__wrapper">
     <div>Add Post: </div>
            Post Title: <input onChange={handlePostChange} name="content"></input>
            Post Content: <input onChange={handlePostChange} name="title"></input>
            Your name: <input onChange={handlePostChange} name="author"></input>
            <button onClick={addPost}> Add </button>
 
     <h1> Posts</h1>
     
     {!loading && 
      postArray.map((post, index) => {
        return (
           
           <div className="post__wrapper">
               
               <div className="post__info">
                <h2> {post['PostTitle']}</h2>
                <p> {post['PostContent']}</p>

                <h2> by: {post['PostAuthor']}</h2>

               </div>
               <div className="comments__container">
                  <h3>Comments: </h3>
              { commentArray &&
                   commentArray.map((comment, index) => {
                       if(comment["PostId"] === post["Id"]) {
                        return (
                            <div className="comment__box">
                                <div className="comment__content">
                                     {comment['CommentContent']}
                                </div>
                              

                                 <h2 className="comment__author"> by: {comment['CommentAuthor']}</h2>
                            </div>
                        )
                       }
                       else {
                        return (
                            <div></div>
                        )
                       }
                    
                    })
              }
              <div>Add comment: </div>
              Your comment: <textarea onChange={handleCommentChange} name="content" ></textarea>
              Your name: <input onChange={handleCommentChange} name="author"></input>
              <button id={post["Id"]} onClick={addComment}> Add </button>
               </div>
               
           </div>
        )
      })}
      </div>
    </>
  )
}

export default Home
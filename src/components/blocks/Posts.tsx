import React, { useState, useEffect } from 'react'
import axios from 'axios';
import server from '../config/config';
import AddComment from './AddComment';

function Posts() {
  const useGetPosts = () => {
    const [postArray, setPostsArray] = useState([])
    const [commentArray, setCommentArray] = useState([])

    const [loading, setLoading] = useState(true)
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${server}getPosts.php`)
        if (response.data !== "0 results") {
          setPostsArray(response.data.posts)
          setCommentArray(response.data.comments)
        }
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    useEffect(() => {
      fetchPosts()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return { postArray, commentArray, loading }
  }
  
  const { loading, postArray, commentArray } = useGetPosts()



  return (
    <>
      {!loading &&
        postArray.map((post, index) => (
          <div className="post__wrapper">
            {/* Post part */}
            <div className="post__info">
              <h2> {post['PostTitle']}</h2>
              <p> {post['PostContent']}</p>
              <h2> by: {post['PostAuthor']}</h2>
            </div>
            {/* Comments for post */}
            <div className="comments__container">
              <h3>Comments: </h3>
              {commentArray &&
                commentArray.map((comment, index) => {
                  if (comment["PostId"] === post["Id"]) {
                    return (
                      <div className="comment__box">
                        <div className="comment__content">
                          {comment['CommentContent']}
                        </div>
                        <h2 className="comment__author">
                          by: {comment['CommentAuthor']}
                        </h2>
                      </div>
                    );
                  }
                  else {
                    return (
                      <></>
                    );
                  }
                })}
              <AddComment PostId={post["id"]} />
            </div>
          </div>
        ))}
    </>
  )
}

export default Posts
import React from 'react';
import AddPosts from '../blocks/AddPost';
import Posts from '../blocks/Posts';

function Home() {
  return (
    <div className="post__wrapper">
     <AddPosts/>
     <Posts/>
    </div>
  )
}

export default Home
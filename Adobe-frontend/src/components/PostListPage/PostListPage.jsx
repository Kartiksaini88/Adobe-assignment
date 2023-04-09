import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {TiUserDelete} from 'react-icons/ti'
import {FaUserEdit,FaComment} from 'react-icons/fa'
import {AiFillLike , AiFillDislike} from 'react-icons/ai'
import DeletePostModal from '../DeletePostModal/DeletePostModal'
import UpdatePost from '../UpdatePost/UpdatePost'

const PostListPage = ({setPostId,postId}) => {
    const [posts , setPosts] = useState([])
    const [open, setOpen] = useState(false)
    const [openpostmodal , setpostmodal] = useState(false)
    const [onepost ,setonepost] = useState({})
    const [id , setid] = useState('');
    const getPosts = ()=>{
        axios.get('https://zealous-garters-dog.cyclic.app/posts')
        .then((res)=>(setPosts(res.data.posts)))
        .catch((err)=>console.log(err))
    }

    const handlechange = (e)=>{
       const {name , value} = e.target
       setonepost({
        ...onepost,
        [name]:value
       })
    }
    const handlePostEditModal = (user)=>{
        setpostmodal(true)
        setonepost(user)
    }
    useEffect(()=>{
        getPosts()
    },[])
    const openModal = (id)=>{
        setOpen(true)
        setid(id)
    }

   
    const handleLikes = (post)=>{
     
        if(post.likes < 0 ){
            post.likes = 0
        }

      axios.patch(`https://zealous-garters-dog.cyclic.app/posts/${post._id}/like`,{...post , likes:Number(++post.likes)})
      .then((res)=>(getPosts()))
      .catch((err)=>console.log(err))

    }

    const handleDislikes = (post)=>{


      axios.patch(`https://zealous-garters-dog.cyclic.app/posts/${post._id}/unlike`,{...post , likes:Number(--post.likes)})
      .then((res)=>(getPosts()))
      .catch((err)=>console.log(err))
    }

  return (
          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Posts</h2>
                <h5>Total Posts : {posts.length}</h5>
              </div>
              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                  <article key={post._id} className="flex max-w-xl flex-col items-start justify-between">
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
                      <div style={{
                        display:"flex",
                        gap:"20px",
                        paddingTop:"1rem"

                    }}>
                    <TiUserDelete style={{
                        cursor:'pointer',
                        fontSize:"1.54rem"
                    }}
                    onClick={()=>openModal(post._id)}
                    ></TiUserDelete>
                    <FaUserEdit style={{
                        cursor:"pointer", 
                        fontSize:"1.5rem" 
                    }} 
                    onClick={()=>handlePostEditModal(post)}
                    ></FaUserEdit>
                    <AiFillLike style={{
                        cursor:"pointer", 
                        fontSize:"1.4rem" 
                    }}
                    onClick={()=>handleLikes(post)}
                    ></AiFillLike>
                    <p>{post.likes}</p>
                    <AiFillDislike style={{
                        cursor:"pointer", 
                        fontSize:"1.4rem" 
                    }}
                    onClick={()=>handleDislikes(post)}
                    ></AiFillDislike>
                    </div>
                    </div>
                    
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                            {post.user_id.name}
                        </p>
                        <p className="text-gray-600">{post.user_id.bio}</p>
                      </div>
                    </div>
                  </article>
                ))}
                <DeletePostModal open={open} setOpen={setOpen} getPosts={getPosts} id={id}></DeletePostModal>
                <UpdatePost onepost={onepost} getPosts={getPosts} setpostmodal={setpostmodal} openpostmodal={openpostmodal} handlechange={handlechange} ></UpdatePost>
             </div>
            </div>
          </div>
        )
      }
      

export default PostListPage

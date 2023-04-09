
import {TiUserDelete} from 'react-icons/ti'
import {FaUserEdit,FaComment} from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from 'axios'
import DeleteModal from '../DeleteModal/DeleteModal'
import { useNavigate } from 'react-router'
import { Button, Col, Input, Label, Modal,ModalBody,ModalHeader, Row } from 'reactstrap'

import UpdateUser from '../UpdateUser/UpdateUser'

  
  export default function UserListPage({setPostId, postId}) {
    const [users , setusers] = useState([])
    const [modal , setmodal] = useState(false)
    const [oneuser ,setoneuser] = useState({})
    const [open, setOpen] = useState(false)
    const [id , setid] = useState('');
    const nav = useNavigate()
   
    const getUsers = ()=>{
        axios.get("https://zealous-garters-dog.cyclic.app/users")
        .then((res)=>setusers(res.data.users))
        .catch((error)=>console.log(error))
    }
    useEffect(()=>{
        getUsers()
    },[])

    const openModal = (id)=>{
        setOpen(true)
        setid(id)
    }

    const handlechange = (e)=>{
      const {name , value} = e.target  
      setoneuser({
        ...oneuser,
        [name]:value
      })
    }
  
     
    const getuserId = (data)=>{
        setPostId(data)
        nav('/post')
    }

    const handleUserEditModal = (user)=>{
        setmodal(true)
        setoneuser(user)
    }

    
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Users</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Total Users : {users.length}
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {users.map((person,i) => (
              <li key={person._id}>
                <div className="flex items-center gap-x-6">
                  <img className="h-16 w-16 rounded-full" src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="user image" />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-ss font-semibold leading-6 text-gray-600">{person.email}</p>
                    <p className="text-ss font-semibold leading-6 text-indigo-600">{person.bio}</p>
                    <div style={{
                        display:"flex",
                        gap:"20px"

                    }}>
                    <TiUserDelete style={{
                        cursor:'pointer',
                        fontSize:"1.54rem"
                    }}
                    onClick={()=>openModal(person._id)}
                    ></TiUserDelete>
                    <FaUserEdit style={{
                        cursor:"pointer", 
                        fontSize:"1.5rem" 
                    }} 
                    onClick={()=>handleUserEditModal(person)}
                    ></FaUserEdit>
                    <FaComment style={{
                        cursor:"pointer", 
                        fontSize:"1.4rem" 
                    }} onClick={()=>getuserId(person._id)}></FaComment>
                    <DeleteModal open={open} setOpen={setOpen} getUsers={getUsers} id={id}></DeleteModal>
                    <UpdateUser handlechange={handlechange} modal={modal} getusers={getUsers} oneuser={oneuser} setmodal={setmodal}></UpdateUser>
                    </div>
                    
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  
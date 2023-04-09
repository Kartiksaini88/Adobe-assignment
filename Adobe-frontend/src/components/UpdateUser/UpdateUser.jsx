
import axios from 'axios'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Button, Col, Input, Label, Modal,ModalBody,ModalHeader, Row } from 'reactstrap'

const UpdateUser = ({modal , setmodal , oneuser ,getusers , handlechange}) => {

    const handleSubmit = (e)=>{
      e.preventDefault()

      axios.patch(`https://zealous-garters-dog.cyclic.app/users/${oneuser._id}`,oneuser)
      .then((res)=>(console.log(res.data) , setmodal(false),getusers()))
      .catch((err)=>console.log(err))
    }
  return (
    <div>
      <Modal
      size='lg'
      isOpen={modal}
      toggle={()=>setmodal(!modal)}
      >
        <ModalHeader
        toggle={()=>setmodal(!modal)}
        >Update User Info</ModalHeader>
        <ModalBody>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col lg={12}>
                        <div>
                            <Label>
                                Name
                            </Label>
                            <input onChange={handlechange} type="text" name="name" className='form-control' value={oneuser.name}/>
                            <Label>
                                Email
                            </Label>
                            <input onChange={handlechange} type="email"
                            style={{
                                cursor:"not-allowed"
                            }}
                            name="email" className='form-control' value={oneuser.email} disabled={true}/>
                            <Label>
                                Bio
                            </Label>
                            <input onChange={handlechange} type="text" name="bio" className='form-control' value={oneuser.bio} />
                            <label htmlFor="">
                             
                            </label>
                            <Input type='submit' style={{
                                backgroundColor:"rgb(31,41,55)",
                                color:"white"
                            }}></Input>
                        </div>
                    </Col>
                </Row>
            </form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default UpdateUser

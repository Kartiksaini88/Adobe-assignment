
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function PostForm({setPostId, postId}) {

    const [form , setform] = useState({
        user_id:postId,
    })
    const nav = useNavigate()
    console.log(form)
    const handleForm = (e)=>{
      const {name , value} = e.target

      setform({
        ...form,
        [name]:value
      })
    }
    
    const submitForm = (e)=>{
        e.preventDefault()

        axios.post('https://zealous-garters-dog.cyclic.app/posts',form)
        .then((res)=>(console.log(res.data),nav('/posts')))
        .catch(err=>console.log(err))
    }
  return (
    <form onSubmit={submitForm}>
      <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                 User ID
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="user_id"
                  id="first-name"
                  autoComplete="name"
                  required={true}
                  disabled={true}
                  value={form.user_id}
                  onChange={handleForm}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Content
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="content"
                  rows={3}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  required={true}
                  onChange={handleForm}
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about post.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

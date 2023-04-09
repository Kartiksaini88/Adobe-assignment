import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import UserListPage from './components/UserListPage/UserListPage';
import UserForm from './components/UserForm/UserForm';
import { Route, Routes } from 'react-router';
import PostListPage from './components/PostListPage/PostListPage';
import PostForm from './components/PostForm/PostFrom';
import { useState } from 'react';

function App() {
  const [postId , setPostId] = useState('')
  return (
    <>
    <Navbar></Navbar>
    <div className="App">
      <Routes>
        <Route path='/' element={<UserListPage setPostId={setPostId} postId={postId}></UserListPage>}></Route>
        <Route path='/create-user' element={<UserForm></UserForm>}></Route>
        <Route path='/posts' element={<PostListPage setPostId={setPostId} postId={postId}></PostListPage>}></Route>
        <Route path='/post' element={<PostForm setPostId={setPostId} postId={postId}></PostForm>}></Route>
      </Routes>
      {/*  */}
    </div>
    </>
  );
}

export default App;

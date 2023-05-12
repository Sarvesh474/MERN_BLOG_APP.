import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import { useEffect, useState } from "react";
import axios from 'axios'
// import Single from '../single/Single'

export default function Homepage() {
  const {search} = useLocation();
  

  const [posts,setPosts]=useState([])

  useEffect(()=>{
    const fetchPosts=async ()=>{
    const res=await axios.get("/posts"+search)
    setPosts(res.data)
    }
    fetchPosts()
  },[search])
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
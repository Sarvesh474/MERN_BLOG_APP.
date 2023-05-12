import { Link } from "react-router-dom";
import "./singlepost.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { Context } from "../../context/Context";

export default function SinglePost() {
  const PF = "http://localhost:5000/images/"
  const location = useLocation()
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context)
  const [post, setPost] = useState({})
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updatemode, setUpdateMode] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  }, [path])

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`,
        {
          data: { username: user.username }
        });
      window.location.replace("/")
    } catch (err) { }
  }

  const handleUpdate=async()=>{
    try {
      await axios.put(`/posts/${post._id}`,
        {
           username: user.username,
           title,
           desc,
        });
      // window.location.reload()
      setUpdateMode(false)
    } catch (err) { }
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo &&
          <img
            className="singlePostImg"
            src={PF + post.photo}
            alt=""
          />}
        {updatemode ? 
        <input 
        type="text" 
        value={title} 
        className="singlePostTitleInput" 
        autoFocus
        onChange={(e)=>setTitle(e.target.value)}
        /> : 
        (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username &&
                <div className="singlePostEdit">
                  <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)} ></i>
                  <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                </div>
              }
            </h1>
          )
        }
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                <b>{post.username}</b>
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updatemode ? 
        <textarea 
        className="singlePostDescInput" 
        value={desc}
        onChange={(e)=>setDesc(e.target.value)}
        /> :(
         <p className="singlePostDesc">{desc}</p>
        )}

        {updatemode &&
       <button className="singlePostButton" onClick={handleUpdate}>UPDATE</button>
        }
      </div>
    </div>
  );
}
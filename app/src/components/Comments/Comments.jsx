import axios from 'axios';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { updateContext } from '../../context/updateContext';
import { userContext } from '../../context/userContex';
import { SingleComment } from './SingleComment';



export function Comments({ bookId }) {
    const [comments, setComments] = useState([])
    const [input, setInput] = useState("");
 
    const {update, setupdate} = useContext(updateContext)
    const { jwt } = useContext(userContext)
const [msg, setMsg] = useState("")
const[touched, setTouched] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3000/comments?book_id=${bookId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then((res) => {
            setComments(res.data)
            setupdate(false)
        }).catch((err) => { console.log(err) })

    }, [update])

    function sortComments(comments) {
        return comments.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateA - dateB;
        });
      }
sortComments(comments)



    function addComment() {
      if(input.trim().length===0){
        setMsg("Comment cannot be empty!")
      }
      else{
     
        axios.post(`http://localhost:3000/comments`, {
            book_id: bookId,
            content: input
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(() => {
            setInput("")
            setMsg("")
            setTimeout(() => {  setupdate(true)}, 1000)
          
        }).catch((err) => { console.log(err) })
    }
    }
    return (
        <div>
<div className='m-0 flex flex-row mt-12 justify-center p-0 '>{msg.length>0 ? <p className="text-red flex ">{msg}</p> : null}</div>
          <div className='flex justify-center items-center gap-5  bg-dark-beige p-8 mr-20 ml-20  '>
  <div className="flex justify-center items-center gap-5">
    
    <button onClick={addComment} className="  bg-green w-22 m-0 h-12  text-white text-sm rounded-md p-1 hover:bg-dark-green hover:text-white">Add comment</button>
    <textarea
      className="w-3/5 p-1"
      placeholder="Write your comment"
      onChange={(e) => {
setTouched(true)
        setInput(e.target.value)
        console.log(touched)
        if(touched){
        e.target.value.length>0 ? setMsg("") : null
        e.target.value.length<2 ? setMsg("Comment too short!") : null
        e.target.value.trim().length===0 ? setMsg("Empty comment!") : null}}}
      value={input}
    ></textarea>
  </div>
</div>
                <div className="flex flex-col justify-center items-center mb-6 gap-5 bg-dark-beige rounded-md p-5 mt-10 mr-20 ml-20  overflow-y-scroll " >
       
            {comments.length>0 ?comments.reverse().map((el) => <SingleComment key={el._id} className="flex flex-col gap-5" el={el} />): null}
        </div>
        </div>
    )
}
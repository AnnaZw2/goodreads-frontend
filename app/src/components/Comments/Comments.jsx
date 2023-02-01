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
        axios.post(`http://localhost:3000/comments`, {
            book_id: bookId,
            content: input
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(() => {
            setInput("")
            setupdate(true)
        }).catch((err) => { console.log(err) })

    }
    return (
        <div>
            <div className='flex justify-center items-center gap-5  bg-dark-beige p-8 mr-20 ml-20 mt-12 '>
            <button onClick={addComment} className="  bg-green w-22 m-0 h-12  text-white text-sm rounded-md p-1 hover:bg-dark-green hover:text-white">Add comment</button>
            <textarea
                className="w-3/5 p-1"
                placeholder="Write your comment"
                onChange={(e) => {
                    setInput(e.target.value)}}
                value={input}
            ></textarea>
            </div>
                <div className="flex flex-col justify-center items-center mb-6 gap-5 bg-dark-beige rounded-md p-5 mt-10 mr-20 ml-20  overflow-y-scroll " >
       
            {comments.length>0 ?comments.reverse().map((el) => <SingleComment className="flex flex-col gap-5" el={el} />): null}
        </div>
        </div>
    )
}
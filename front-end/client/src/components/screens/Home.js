import React, {useState, useEffect, useContext} from 'react';
import {userContext} from '../../App';

const Home = () => {
    const [data, setData] = useState([]);
    const {state, dispatch} = useContext(userContext);
    useEffect(()=> {
        fetch('/allposts', {
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setData(result)
        })
    }, []);
    const likePost = (id) => {
        fetch('/like', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result=> {
            const newData = data.map(item=> {
                if(item._id == result._id) {
                    return result;
                }
                return item;
            })
            setData(newData);
        })
    }
    const unlikePost = (id) => {
        fetch('/unlike', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result=> {
            const newData = data.map(item=> {
                if(item._id == result._id) {
                    return result;
                }
                else {
                    return item;
                }
            })
            setData(newData);
        })
    }
    return (
        <div className="home">
            {
                data.map(item=> {
                    return(
                        <div className="card home-card" key={item._id}>
                        <h5>{item.postedBy.name}</h5>
                        <div className="card-image">
                            <img src={item.photo} />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color: "red"}}>favorite</i>
                            {item.likes.includes(state._id) ? 
                            <i className="material-icons" onClick={()=> {unlikePost(item._id)}}>thumb_down</i> : <i className="material-icons" onClick={()=> {likePost(item._id)}}>thumb_up</i>}
                            <h6>{item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input type="text" placeholder="add a comment"/>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Home;
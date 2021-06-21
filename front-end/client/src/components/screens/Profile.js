import React, {useEffect, useState, useContext} from 'react';
import {userContext} from '../../App'

const Profile = () => {
    const [mypics, setPics] = useState([]);
    const {state, dispatch} = useContext(userContext);
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=> {
            setPics(result.mypost);
        })
    }, [])
    return (
        <div style={{maxWidth: "800px", margin: "0 auto"}}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px"
            }}>
                <div>
                    <img style={{width: "160px", height: "160px", borderRadius: "80px"}} 
                    src="https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <h5>{state?state.email:"loading"}</h5>
                    <div style= {{display: "flex", justifyContent: "space-between", width:"108%"}}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.followers.length:0} followers</h6>
                        <h6>{state?state.following.length:0} following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=> {
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        ) 
                    })
                }
                
            </div>
        </div>
    );
};

export default Profile;
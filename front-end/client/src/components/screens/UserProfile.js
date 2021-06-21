import React, {useEffect, useState, useContext} from 'react';
import {userContext} from '../../App'
import { useParams } from 'react-router-dom';

const Profile = () => {
    const [userProfile, setProfile] = useState(null);
    const [showfollow, setShowFollow] = useState(true);
    const {state, dispatch} = useContext(userContext);
    const {userid} = useParams();
     useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=> {
            
            setProfile(result);
        })
    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               followId: userid 
            })
        }).then(res=> res.json())
        .then(data=> {
            dispatch({type:"UPDATE", payload:{following:data.following, followers: data.followers}})
            localStorage.setItem("user", JSON.stringify(data));
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user: {...prevState.user,
                        followers: [...prevState.user.followers, data._id]
                    }
                }
            }
            );
            setShowFollow(false);
        })
    }
    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               unfollowId: userid 
            })
        }).then(res=> res.json())
        .then(data=> {
            dispatch({type:"UPDATE", payload:{following:data.following, followers: data.followers}})
            localStorage.setItem("user", JSON.stringify(data));
            setProfile((prevState) => {
                const newFollower = prevState.user.followers.filter(item=> {
                    item !== data._id
                })
                return {
                    ...prevState,
                    user: {...prevState.user,
                        followers: newFollower
                    }
                }
            }
            );
            setShowFollow(true);
        })
    }

    return (
        <div>
        {userProfile ? 
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
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>
                    <div style= {{display: "flex", justifyContent: "space-between", width:"108%"}}>
                        <h6>{userProfile.posts.length} posts</h6>
                        <h6>{userProfile.user.followers.length} followers</h6>
                        <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    {showfollow ? 
                    <button style={{margin: "10px"}} className="btn waves-effect waves-light #64b5f6 blue lighten-2" type="submit" name="action"
                    onClick={()=> followUser()}>
                        Follow
                    </button> :
                    <button style={{margin: "10px"}} className="btn waves-effect waves-light #64b5f6 blue lighten-2" type="submit" name="action"
                    onClick={()=> unfollowUser()}>
                        Unfollow
                    </button>
                    }
                </div>
            </div>
            <div className="gallery">
                {
                    userProfile.posts.map(item=> {
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        ) 
                    })
                }
                
            </div>
        </div>: <h2>loading...</h2>}
        </div>
    );
};

export default Profile;
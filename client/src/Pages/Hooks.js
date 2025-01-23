import React, {useState,useEffect} from 'react';

const Hooks = () => {

    const[list,setList] = useState([])

    const fetchingStuff = () =>{
            
        setTimeout(()=>{
            fetch('https://api.github.com/users')
        .then(Response=>Response.json())
        .then(data=>{
            setList(data)
            console.log(list);
        })
        },2000)
        }
        
    useEffect(()=>{
        fetchingStuff();
    },[])
    


    // fetchingStuff();
    return (
        <div>
            
            {list.length!==0 ?
            
            list.map(listItem=>{
                return (
                <div>{listItem.id + " " + listItem.login }
                    <div>{listItem.avatar_url}</div>
                    <img src={listItem.avatar_url} alt="" />
                </div>
                )
            })
            : <h2>Loading...</h2>
        }
            
            
            {/* <button onClick={()=>fetchingStuff()}>click</button> */}
        </div>
    );
}

export default Hooks;

import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App() {
    const [msg, setMsg] = useState([])
    const [userMsg, setUserMsg] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5001/user/')
            .then( msg => {
                if(msg.data.length > 0)
                    setMsg(msg.data.map(res => res))
            })
    })

    const sendMsg = () => {
        const newMessage = {
            user: name,
            msg: userMsg
        }
        axios.post('http://localhost:5001/user', newMessage)
            .then( res => {
                setMsg([...msg, newMessage])
                setUserMsg('')
            })

    }
    const deletePost = (e) => {
        axios.delete('http://localhost:5001/user/'+ e.target.value)
            .then(setMsg(msg.filter(el => el._id !== e.target.value)))
        console.log(e.target.value)
    }
    const onChangeMsg = (e) => {
        setUserMsg(e.target.value)
    }
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    
  return (
    <div className="App">
        <div style = {container}>
            <div style={{width:'80%'}}>
        <div style = {{overflow:'auto', height:'85vh'}}> 
            {msg.map( el => {
                return (
                    <div style={{marginBottom:15}} key={el._id}>
                        <div style={{color:'orange', fontWeight:'bold'}}>{el.user}</div>
                        <div>{el.msg}</div>
                        <button onClick = {deletePost} value= {el._id}>Delete</button>
                    </div>
                )
            })}
        </div>
        <div style = {{position:'absolute', top:'90%'}}>
        <input style = {input} type= 'text' placeholder = 'enter name' value = {name} onChange = {onChangeName} />
        <input style = {input} type= 'text' placeholder = 'enter message' value = {userMsg} onChange = {onChangeMsg} />
        <button onClick = {sendMsg} style = {button}>Send message</button>
        </div>
        </div>
        </div> 
    </div>

  );
}

const container = {
    display: 'flex',
    height:'95vh',
    justifyContent:'center',
    width:'100vw'
}

const input = {
    width:400,
    height:35,
    alignSelf: 'flex-end',
    fontSize: 18
}

const button = {
    height: 42, 
    alignSelf:'flex-end',
    cursor:'pointer'
}

export default App;

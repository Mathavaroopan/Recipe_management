import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import './css/auth.css'
const Auth = () => {
    return (
        <div className="auth">
            <Login/>
            <Register/>
        </div>
    )
}

export default Auth;

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ , setCookies] = useCookies(["access_token"])

    const navigate = useNavigate();

    const onSubmit = async(event) => {
        event.preventDefault();

        try{
            const response = await axios.post("http://localhost:3001/auth/login", {
                username, password
            })
            
            setCookies("access_token", response.data.token);
            console.log(response.data.userID);
            window.localStorage.setItem("userID", response.data.userID);
            navigate('/');
        }catch(err){
            alert("Wrong credentials...")
            console.log(err.message);
        }
    }


    return (
        <Form
            purpose="Login"
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            onSubmit={onSubmit}
        />
    )
}

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            await axios.post("http://localhost:3001/auth/register", {
                username, password
            })
            console.log("Inga irukken")
            alert("Registration successful! Now Login!!")
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <Form
            purpose="Register"
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            onSubmit={onSubmit}
        />
    )
}


const Form = ({purpose, username, setUsername, password, setPassword, onSubmit}) => {

    return (
        <div className="form-type">
            <h2>{purpose}</h2>
            <form>
                <input type="text" placeholder="username..." value={username} onChange={(event) => setUsername(event.target.value)}/>
            </form>
            <form>
                <input type="text" placeholder="Password..." value={password} onChange={(event) => setPassword(event.target.value)}/>
            </form>
            <button type="submit" onClick={onSubmit}>Submit</button>
        </div>
    )
}
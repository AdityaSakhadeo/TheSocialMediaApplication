import {React, useState} from 'react';



export default function Login() {
    
  const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        e.preventDefault();
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    )

}
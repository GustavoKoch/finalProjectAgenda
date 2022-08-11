import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../utils/Auth";
import "./login.css";

import axios from '../../services/axios';
const LOGIN_URL = '/users/login';

const Login = () => {
    const { setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('guso88@hotmail.com');
    const [pwd, setPwd] = useState('12345678');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate=useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
               { "email":user, "password":pwd },
                {
                    headers: {'Content-Type': 'application/json', origin:
    
                    'https://projectberlincalender.netlify.app/'},
                   
                }
            );
/*             console.log(response?.data);
            console.log(response); */
            const accessToken = response?.data?.token;
            console.log(accessToken);            
            /* const roles = response?.data?.roles; */
            setAuth({ user, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className='login'>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    
                        <h3 id="goHome" onClick={()=>navigate("/home")}>Go to Home</h3>
                   
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default Login

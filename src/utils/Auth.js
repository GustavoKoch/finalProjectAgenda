import { useState, createContext, useContext, useEffect } from "react";


const AuthContext = createContext(null)

/* AuthProvider that will wrap all the components */
export const AuthProvider = ({children}) => {
   /*  const [user, setUser] = useState(null) */
   const [auth, setAuth] = useState({});

  /*   const login = (user => { setUser(user) })
    const logout = (user => { setUser(null) }) */

   if(auth.accessToken)
    localStorage.setItem('myToken', auth.accessToken);
const myToken=localStorage.getItem('myToken', auth.accessToken);

    useEffect(() => {
       
      setAuth(myToken)

    }, [auth]);


/* console.log(auth) */
    return (<AuthContext.Provider value={{ auth, setAuth }} /* value={{ user, login, logout }}*/>{children}</AuthContext.Provider>
    )
}


/* Function for returning AuthContext some variables values like user */
/* export const useAuth=()=>{return useContext(AuthContext)} */



export default AuthContext;


/// ไปเอา login กับ user state มาไว้ที่ context

import { createContext } from "react";
import { loginApi } from "../apis/authApi";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const login = async (loginData)=>{
        let response = await loginApi(loginData);
        console.log(response.data);
        setUser(response.data);
        navigate("/");
    }

return(
    <AuthContext.Provider value ={}>{children}</AuthContext.Provider>
)

}

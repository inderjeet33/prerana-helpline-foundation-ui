// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ----------- LOAD USER FROM /me -----------
//   const refreshUser = async () => {
//     const token = localStorage.getItem("token");
//     console.log("token is "+token);
//     if (!token) {
//       console.log("here");
//       setUser(null);
//       setLoading(false);
//       return;
//     }

//     try {
//       console.log("token before calling is "+token);
//       const res = await axios.get("http://localhost:8080/user/me", {
//         headers: { Authorization: "Bearer " + token }
//       });

//       console.log(res);
//       setUser(res.data); // { id, name, mobile, role, email }
//     } catch (err) {
//       console.log("Invalid token");
//       setUser(null);
//       localStorage.removeItem("token");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load user at startup
//   useEffect(() => {
//     refreshUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, refreshUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/"; // HARD redirect (safe on expiry)
  };

  const refreshUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:8080/user/me", {
        headers: { Authorization: "Bearer " + token }
      });

      setUser(res.data);
    } catch (err) {
      console.log("Token expired or invalid → logging out");
      logout(); // 🔥 THIS IS THE KEY
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, refreshUser, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

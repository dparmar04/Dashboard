// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(undefined); // ✅ Start with undefined (avoids mismatch)
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     setUser(storedUser ? JSON.parse(storedUser) : null);
//   }, []);

//   const login = (email, password) => {
//     if (!email.includes("@") || password.length < 6) {
//       alert("Invalid email or password must be at least 6 characters.");
//       return;
//     }

//     const userData = { email };
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//     router.push("/dashboard");
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     router.push("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {user !== undefined ? children : null} {/* ✅ Avoid rendering until user is set */}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // ✅ Start with undefined (avoids mismatch)
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const checkUserExists = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some((u) => u.email === email);
  };

  const signup = (email, password) => {
    if (!email.includes("@") || password.length < 6) {
      alert("Invalid email or password must be at least 6 characters.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (checkUserExists(email)) {
      alert("User already exists! Please login.");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
  };

  const login = (email, password) => {
    if (!email.includes("@") || password.length < 6) {
      alert("Invalid email or password must be at least 6 characters.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find((u) => u.email === email && u.password === password);

    if (!validUser) {
      alert("User not found or incorrect password! Please check your details or sign up.");
      return;
    }

    const userData = { email };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const deleteAccount = () => {
    if (!user) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((u) => u.email !== user.email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.removeItem("user");
    setUser(null);
    alert("Your account has been deleted.");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, checkUserExists, deleteAccount }}>
      {user !== undefined ? children : null} {/* ✅ Avoid rendering until user is set */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

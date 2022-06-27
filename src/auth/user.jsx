import { useState, createContext } from "react";

const UserContext = createContext()

export default function User() {
    const [user, setUser] = useState("Jesse Hall");
  
    return (
      <UserContext.Provider value={user}>
        <h1>{`Hello ${user}!`}</h1>
        <Component2 user={user} />
      </UserContext.Provider>
    );
  }
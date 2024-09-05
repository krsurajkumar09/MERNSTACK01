import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState([]);
  const [age, setAge] = useState([]);


  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const Submit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/createUser", { name, age });
      console.log(response.data); // Log the response data instead of users
    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  return (

    <>
      <div className="center">
        <h2>First MERN (Mongo, Express, React, Node) App</h2>
        {users.map((user, index) => (
          <div key={index}>
            <h3>{user.name}</h3>
            <h3>{user.age}</h3>
          </div>
        ))}

        <br />

        <input type="text" onChange={(e) => setName(e.target.value)} />
        <input type="Number" onChange={(e) => setAge(e.target.value)} />
        <button onClick={Submit}>Create User</button>
      </div>
    </>
  );
}

export default App;


import React, { useContext, useState } from "react";
import { UsersContext } from "../contexts/UsersContext";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { addUser } = useContext(UsersContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      addUser({ name, email });
      setName("");
      setEmail("");
      console.log("User added successfully: ", name, email);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;

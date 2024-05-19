import React, { useContext, useState } from "react";
import { UsersContext } from "../contexts/UsersContext";

const Users = () => {
  const { users, addUser, updateUser, deleteUser } = useContext(UsersContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateUser(currentUser.id, { name, email });
      setEditing(false);
      setCurrentUser(null);
    } else {
      addUser({ name, email });
    }
    setName("");
    setEmail("");
  };

  const handleEdit = (user) => {
    setEditing(true);
    setCurrentUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDelete = (id) => {
    deleteUser(id);
  };

  return (
    <div>
      <h2>Manage Users</h2>
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
        <button type="submit">{editing ? "Update User" : "Add User"}</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        user
      );
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${id}`,
        updatedUser
      );
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
};

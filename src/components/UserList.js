import React, { useContext } from "react";
import { UsersContext } from "../contexts/UsersContext";

function UserList() {
  const { users } = useContext(UsersContext);

  return (
    <div>
      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

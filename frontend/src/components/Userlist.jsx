import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Undo2 } from 'lucide-react';

// NavBar component
const NavBar = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/shop');
  };
  
  return (
    <div className="bg-gray-800 text-white p-4">
      <button onClick={goBack} className="text-white hover:text-gray-300">
        <Undo2 strokeWidth={2.5} className="w-5 stroke-gray-100" />
      </button>
    </div>
  );
};

// Userlist component
const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  return (
    <div>
      <NavBar />
      <div className="mt-4">
        <h1 className="text-3xl font-bold mb-4">Users</h1>
        <h2 className="text-2xl font-bold mb-2">List of Users</h2>
        <Link
          to="/users/add"
          className="bg-primary text-white py-2 px-4 rounded mb-2 inline-block"
        >
          Add New
        </Link>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border border-gray-300">No</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Email</th>
              <th className="py-2 px-4 border border-gray-300">Role</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.uuid} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
                <td className="py-2 px-4 border border-gray-300">{user.name}</td>
                <td className="py-2 px-4 border border-gray-300">{user.email}</td>
                <td className="py-2 px-4 border border-gray-300">{user.role}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <Link
                    to={`/users/edit/${user.uuid}`}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2 inline-block"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.uuid)}
                    className="bg-red-500 text-white py-1 px-2 rounded inline-block"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userlist;

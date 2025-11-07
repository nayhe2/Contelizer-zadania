import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import type User from "../types";
import EditModal from "./EditModal";
import UserTable from "./UserTable";

export default function Users(props: any) {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User>();
  const [editedUser, setEditedUser] = useState<Partial<User>>({});

  const handleEditRequest = (user: User) => {
    axiosInstance
      .patch(`/users/${user.id}`, {
        id: editedUser?.id,
        name: editedUser?.name,
        email: editedUser?.email,
        status: editedUser?.status,
        gender: editedUser?.gender,
      })
      .then((response) => {
        const updatedUser = response.data;

        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
      })
      .catch((error) => {
        console.error(error.response?.data || error);
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/users?name=${props.value}`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, [props.value]);

  const handleChanges = (user: User) => {
    setEditingUser(user);
    setEditedUser(user);
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <EditModal
          editedUser={editedUser}
          editingUser={editingUser}
          handleEditRequest={handleEditRequest}
          setShowModal={setShowModal}
          setEditedUser={setEditedUser}
          users={users}
          handleChanges={handleChanges}
        />
      )}
      {users.length > 0 ? (
        <UserTable handleChanges={handleChanges} users={users} />
      ) : (
        <div className="flex items-center justify-center min-h-screen ">
          <p className="text-gray-600">no users found</p>
        </div>
      )}
    </>
  );
}

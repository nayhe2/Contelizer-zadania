import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import type User from "../types";

export default function Users(props: any) {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User>();
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const emailRegex = "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;";

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
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-white p-8 rounded-xl w-[400px] flex flex-col gap-4 shadow-lg">
            <h2 className="text-xl font-semibold text-center">Edit user</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  editedUser.email &&
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    editedUser.email
                  )
                ) {
                  alert("Niepoprawny e-mail");
                  return;
                }
                handleEditRequest(editingUser!);
                setShowModal(false);
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder={editingUser?.name}
                required
                value={editedUser.name || ""}
                onChange={(e) =>
                  setEditedUser((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <input
                type="email"
                placeholder={editingUser?.email}
                required
                value={editedUser.email || ""}
                onChange={(e) =>
                  setEditedUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />

              <select
                value={editedUser.gender || ""}
                required
                onChange={(e) =>
                  setEditedUser((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>

              <select
                value={editedUser.status || ""}
                required
                onChange={(e) =>
                  setEditedUser((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-1 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-1 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div>
        {users.map((user) => (
          <div key={user.id}>
            <p>
              <strong>{user.id} </strong>
              <strong>{user.name}</strong> {user.email}{" "}
              <strong>{user.gender}</strong> {user.status}{" "}
              <button
                onClick={() => {
                  handleChanges(user);
                }}
              >
                edit
              </button>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

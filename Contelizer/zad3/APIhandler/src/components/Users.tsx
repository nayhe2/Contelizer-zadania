import { useEffect, useCallback, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  gender?: "male" | "female" | string;
  status?: "active" | "inactive" | string;
}

export default function Users(props: any) {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (user: User) => {
    axios
      .put(
        `https://gorest.co.in/public/v2/users/${user.id}`,
        {
          name: "Allasani Peddana",
          email: "allasani.peddana@15ce.com",
          status: "active",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .get(`https://gorest.co.in/public/v2/users?name=${props.value}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, [props.value]);
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-white p-5 rounded">
            <p>Modal content</p>
            <button onClick={() => setShowModal(false)}>Close</button>
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
                  setShowModal(true);
                  handleEdit(user);
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

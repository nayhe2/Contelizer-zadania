import type User from "../types";
import { useState, type Dispatch, type SetStateAction } from "react";

type editModalProps = {
  users: User[];
  handleChanges: (user: User) => void;
  editedUser: Partial<User>;
  editingUser: User | undefined;
  handleEditRequest: (user: User) => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setEditedUser: Dispatch<SetStateAction<Partial<User>>>;
};

type errorType = {
  email: boolean;
  name: boolean;
};

const EditModal = ({
  editedUser,
  editingUser,
  handleEditRequest,
  setShowModal,
  setEditedUser,
}: editModalProps) => {
  const [errors, setErrors] = useState<errorType>({
    email: false,
    name: false,
  });
  const checkSubmit = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const nameRegex =
      /^[A-Za-zÀ-ÖØ-öø-ÿĄĆĘŁŃÓŚŹŻąćęłńóśźż]+\.?\s?([A-Za-zÀ-ÖØ-öø-ÿĄĆĘŁŃÓŚŹŻąćęłńóśźż]+([.\s-]?[A-Za-zÀ-ÖØ-öø-ÿĄĆĘŁŃÓŚŹŻąćęłńóśźż]+)*)?$/;

    let hasError = false;

    if (editedUser.email && !emailRegex.test(editedUser.email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, email: false }));
    }

    if (editedUser.name && !nameRegex.test(editedUser.name)) {
      setErrors((prev) => ({ ...prev, name: true }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, name: false }));
    }

    if (hasError) {
      return;
    }

    if (!editingUser) {
      return;
    }

    handleEditRequest(editingUser);
    setShowModal(false);
    setErrors({ email: false, name: false });
  };
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4 sm:px-6 md:px-8">
      <div className="relative bg-white z-10000 p-6 sm:p-8 rounded-xl w-full max-w-[400px] sm:max-w-[500px] flex flex-col gap-4 shadow-xl">
        <h2 className="text-lg sm:text-xl font-semibold text-center">
          Edit user
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkSubmit();
          }}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder={editingUser?.name}
              required
              className="border rounded-md px-3 py-2 text-sm sm:text-base"
              value={editedUser.name || ""}
              onChange={(e) =>
                setEditedUser((prev: Partial<User>) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <div className="text-red-600 h-2 text-sm">
              {errors.name && "forbidden characters in name"}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder={editingUser?.email}
              required
              className="border rounded-md px-3 py-2 text-sm sm:text-base"
              value={editedUser.email || ""}
              onChange={(e) =>
                setEditedUser((prev: Partial<User>) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
            <div className="text-red-600 h-2 text-sm">
              {errors.email && "forbidden characters in email"}
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={editedUser.gender || ""}
              required
              className="border rounded-md px-3 py-2 text-sm sm:text-base"
              onChange={(e) =>
                setEditedUser((prev: Partial<User>) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={editedUser.status || ""}
              required
              className="border rounded-md px-3 py-2 text-sm sm:text-base"
              onChange={(e) =>
                setEditedUser((prev: Partial<User>) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex-1"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex-1"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;

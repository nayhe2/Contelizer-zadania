import type User from "../types";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

type UserTableProps = {
  users: User[];
  handleChanges: (user: User) => void;
};

const UserTable = ({ handleChanges, users }: UserTableProps) => {
  return (
    <div className="w-full overflow-x-auto  border border-gray-300 shadow-sm">
      <Table className=" w-full bg-white text-sm sm:text-base">
        <Thead className="bg-gray-100">
          <Tr>
            <Th className="px-4 py-2 text-left text-gray-700 font-semibold">
              ID
            </Th>
            <Th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Name
            </Th>
            <Th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Email
            </Th>
            <Th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Gender
            </Th>
            <Th className="px-4 py-2 text-left text-gray-700 font-semibold">
              Status
            </Th>
            <Th className="px-4 py-2 text-center text-gray-700 font-semibold">
              Actions
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {users.map((user: User) => (
            <Tr
              key={user.id}
              className="border-b border-gray-300 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <Td className="px-4 py-2">{user.id}</Td>
              <Td className="px-4 py-2 font-medium text-gray-800">
                {user.name}
              </Td>
              <Td className="px-4 py-2 text-gray-800">{user.email}</Td>
              <Td className="px-4 py-2">{user.gender}</Td>
              <Td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    user.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </Td>
              <Td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleChanges(user)}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                >
                  Edit
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default UserTable;

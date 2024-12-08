import React from "react";
import { UserCircle } from "lucide-react";

const Profile = ({ user }) => {
  // Map role to more descriptive text
  const getRoleDescription = (role) => {
    switch (role) {
      case "student":
        return "Peserta Didik";
      case "teacher":
        return "Pengajar";
      default:
        return role;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-4">
          <UserCircle className="w-16 h-16 text-purple-600" />
          <div>
            <h3 className="text-lg font-semibold">{user?.email}</h3>
            <p className="text-gray-500">{getRoleDescription(user?.role)}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border-t pt-4">
            <h4 className="font-medium">Email</h4>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-medium">Role</h4>
            <p className="text-gray-600">{getRoleDescription(user?.role)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

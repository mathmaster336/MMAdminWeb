import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import SecurityIcon from "@mui/icons-material/Security";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";

const MyProfile = () => {
  const adminData = {
    name: "Vikas Sharma",
    email: "vikas@example.com",
    role: "Admin",
    lastLogin: "2025-07-01 10:30 AM",
    createdAt: "2024-01-10",
  };

  const [openPassDialog, setOpenPassDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [editData, setEditData] = useState({
    name: adminData.name,
    email: adminData.email,
    role: adminData.role,
  });

  const handleLogout = () => {
    alert("Logged out");
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = () => {
    alert(`Password changed from "${passwords.oldPassword}" to "${passwords.newPassword}"`);
    setPasswords({ oldPassword: "", newPassword: "" });
    setOpenPassDialog(false);
  };

  const handleProfileUpdate = () => {
    alert(`Profile updated: ${JSON.stringify(editData, null, 2)}`);
    setOpenEditDialog(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 transition-all duration-300">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2">
        <AccountCircleIcon className="text-blue-600" /> My Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center gap-2">
          <AccountCircleIcon className="text-gray-500" />
          <div>
            <p className="text-gray-600 text-sm">Name</p>
            <p className="text-lg font-semibold">{adminData?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <EmailIcon className="text-gray-500" />
          <div>
            <p className="text-gray-600 text-sm">Email</p>
            <p className="text-lg font-semibold">{adminData?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SecurityIcon className="text-gray-500" />
          <div>
            <p className="text-gray-600 text-sm">Role</p>
            <p className="text-lg font-semibold">{adminData?.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AccessTimeIcon className="text-gray-500" />
          <div>
            <p className="text-gray-600 text-sm">Last Login</p>
            <p className="text-lg font-semibold">{adminData?.lastLogin}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CalendarTodayIcon className="text-gray-500" />
          <div>
            <p className="text-gray-600 text-sm">Account Created</p>
            <p className="text-lg font-semibold">{adminData?.createdAt}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Button
          variant="outlined"
          onClick={() => setOpenEditDialog(true)}
          color="primary"
          startIcon={<EditIcon />}
        >
          Edit Profile
        </Button>
        <Button
          variant="contained"
          onClick={() => setOpenPassDialog(true)}
          color="primary"
          startIcon={<LockResetIcon />}
        >
          Update Password
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </div>

      {/* Update Password Dialog */}
      <Dialog open={openPassDialog} onClose={() => setOpenPassDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent className="space-y-4 py-4">
          <TextField
            label="Old Password"
            name="oldPassword"
            type="password"
            fullWidth
            value={passwords.oldPassword}
            onChange={handlePasswordChange}
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            fullWidth
            value={passwords.newPassword}
            onChange={handlePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPassDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handlePasswordUpdate} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent className="space-y-4 py-4">
          <TextField
            label="Name"
            name="name"
            value={editData.name}
            onChange={handleProfileChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={editData.email}
            onChange={handleProfileChange}
            fullWidth
          />
          <TextField
            label="Role"
            name="role"
            value={editData.role}
            onChange={handleProfileChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleProfileUpdate} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyProfile;

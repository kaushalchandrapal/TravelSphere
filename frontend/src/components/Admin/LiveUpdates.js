import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { toast } from "react-toastify";
import { axios } from "../../utils/axios";

const LiveUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await axios.get("/admin/liveupdates");
      setUpdates(response.data);
    } catch (error) {
      toast.error("Failed to fetch live updates.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/liveupdates/${id}`);
      toast.success("Live update deleted successfully!");
      fetchUpdates();
    } catch (error) {
      toast.error("Failed to delete live update.");
    }
  };

  const handleEdit = (update) => {
    setSelectedUpdate(update);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUpdate(null);
  };

  const handleSave = async () => {
    try {
      if (selectedUpdate._id) {
        await axios.put(`/admin/liveupdates/${selectedUpdate._id}`, selectedUpdate);
        toast.success("Live update updated successfully!");
      }
      setOpen(false);
      fetchUpdates();
    } catch (error) {
      toast.error("Failed to save live update.");
    }
  };

  return (
    <div>
      <h2>Manage Live Updates</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Update ID</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {updates.map((update) => (
            <TableRow key={update._id}>
              <TableCell>{update._id}</TableCell>
              <TableCell>{update.userName || "No User Name"}</TableCell>
              <TableCell>
                <img
                  src={update.image}
                  alt="Live Update"
                  style={{ width: "100px", height: "auto" }}
                />
              </TableCell>
              <TableCell>{new Date(update.date).toLocaleString()}</TableCell>
              <TableCell>
                <Button
                variant="contained"
                  color="error"
                  onClick={() => handleDelete(update._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LiveUpdates;

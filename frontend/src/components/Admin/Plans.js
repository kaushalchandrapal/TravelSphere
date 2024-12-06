import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { toast } from "react-toastify";
import { axios } from "../../utils/axios";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({destination:"" , travelDescription:""});

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    console.log("selectedPlan" , selectedPlan);
    
  },[selectedPlan])

  const fetchPlans = async () => {
    try {
      const response = await axios.get("/admin/plans");
      setPlans(response.data);
      
    } catch (error) {
      toast.error("Failed to fetch plans.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/plan/${id}`);
      toast.success("Plan deleted successfully!");
      fetchPlans();
    } catch (error) {
      toast.error("Failed to delete plan.");
    }
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlan({destination:"" , travelDescription:""});
  };

  const handleSave = async () => {
    try {
      if (selectedPlan._id) {
        await axios.put(`/admin/plan/${selectedPlan._id}`, selectedPlan);
        toast.success("Plan updated successfully!");
      }
      setOpen(false);
      fetchPlans();
    } catch (error) {
      toast.error("Failed to save plan.");
    }
  };

  return (
    <div>
      <h2>Manage Plans</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Plan ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan._id}>
              <TableCell>{plan._id}</TableCell>
              <TableCell>{plan.destination}</TableCell>
              <TableCell>{plan.travelDescription }</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => handleEdit(plan)}>Edit</Button>
                
                <Button variant="contained" color="error" onClick={() => handleDelete(plan._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Plan Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Plan</DialogTitle>
        <DialogContent>
          <TextField
            label="travelDescription"
            fullWidth
            name="travelDescription"
            value={selectedPlan?.travelDescription || ""}
            onChange={(e) =>
              setSelectedPlan({ ...selectedPlan, travelDescription: e.target.value })
            }
          />
          <TextField
            label="destination"
            name="destination"
            fullWidth
            value={selectedPlan?.destination  || ""}
            onChange={(e) =>
              setSelectedPlan({ ...selectedPlan, destination: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Plans;

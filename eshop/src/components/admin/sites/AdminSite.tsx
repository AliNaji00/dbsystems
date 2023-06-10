import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useUsers } from "../../../stores/useUsers";
import { title } from "../../app/router/RouteNames";
import { IUser, UserRole } from "../../network/APITypes";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { AdminNavBar } from "../AdminNavBar";
import { useForm } from "react-hook-form";

type MakeSellerParams = {
  store_name: string;
  store_address: string;
  phone_no: string;
  store_email: string;
};

export const AdminSite = () => {
  const users = useUsers();
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<UserRole | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MakeSellerParams>();

  const handleRoleChange = (
    user_id: string,
    role: UserRole,
    sellerInfo?: MakeSellerParams
  ) => {
    console.log(`Role: ${role} changed for user: ${user_id}`);
    // TODO: Handle role change logic here
    if (sellerInfo) {
      // TODO: Handle seller store information here
      console.log(sellerInfo);
    }
  };

  const handleClickOpen = (user: IUser, role: UserRole) => {
    setSelectedUser(user);
    setSelectedRole(role);
    setOpen(true);
  };

  const handleClose = (confirmed: boolean, data?: MakeSellerParams) => {
    setOpen(false);
    if (confirmed && selectedUser && selectedRole) {
      handleRoleChange(selectedUser.user_id, selectedRole, data);
    }
  };

  const onSubmit = (data?: MakeSellerParams) => {
    handleClose(true, data);
  };

  return (
    <>
      <Helmet>
        <title>{title("Admin")}</title>
      </Helmet>
      <AdminNavBar />
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Seller</TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell>{user.user_id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={user.userroles.includes("customer")}
                        onChange={() =>
                          !user.userroles.includes("customer") &&
                          handleClickOpen(user, "customer")
                        }
                        disabled={user.userroles.includes("customer")}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={user.userroles.includes("seller")}
                        onChange={() =>
                          !user.userroles.includes("seller") &&
                          handleClickOpen(user, "seller")
                        }
                        disabled={user.userroles.includes("seller")}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={user.userroles.includes("admin")}
                        onChange={() =>
                          !user.userroles.includes("admin") &&
                          handleClickOpen(user, "admin")
                        }
                        disabled={user.userroles.includes("admin")}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CenteredContent>
      </BackgroundContainer>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2 style={{ margin: "20px 20px 0" }}>{"Add New User-Role"}</h2>
        <DialogContent sx={{ maxWidth: 500 }}>
          <p style={{ fontSize: 22, marginTop: 0 }}>
            Are you sure you want to add the role of {selectedRole} to{" "}
            {selectedUser?.name}?
          </p>
          {selectedRole === "seller" && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <TextField
                {...register("store_name", { required: true })}
                label="Store Name"
                fullWidth
              />
              {errors.store_name && <span>This field is required</span>}
              <TextField
                {...register("store_address", { required: true })}
                label="Store Address"
                fullWidth
              />
              {errors.store_address && <span>This field is required</span>}
              <TextField
                {...register("phone_no", { required: true })}
                label="Phone Number"
                fullWidth
              />
              {errors.phone_no && <span>This field is required</span>}
              <TextField
                {...register("store_email", { required: true })}
                label="Store Email"
                fullWidth
              />
              {errors.store_email && <span>This field is required</span>}
            </form>
          )}
        </DialogContent>
        <DialogActions style={{ padding: "0 24px 20px" }}>
          <Button
            onClick={() => handleClose(false)}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleClose(true)}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

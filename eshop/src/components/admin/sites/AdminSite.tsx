import {
  Button,
  Checkbox,
  Dialog,
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
import { observer } from "mobx-react";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useUsers } from "../../../stores/useUsers";
import { title } from "../../app/router/RouteNames";
import { API } from "../../network/API";
import { IPutUserRequest, IUser, UserRole } from "../../network/APITypes";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { emailRegex, phoneRegex } from "../../util/Helpers";
import { AdminNavBar } from "../AdminNavBar";

type MakeSellerParams = {
  store_name: string;
  store_address: string;
  phone_no: string;
  store_email: string;
};

export const AdminSite = observer(() => {
  const users = useUsers();
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<UserRole | null>(null);

  const generalStore = useGeneralStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MakeSellerParams>();

  const handleRoleChange = async (
    user_id: string,
    role: UserRole,
    sellerInfo?: MakeSellerParams
  ) => {
    try {
      if (!!sellerInfo) {
        const data: IPutUserRequest = {
          user_id: user_id,
          user_type: role,
          ...sellerInfo,
        };

        await API.putUser(data);
        generalStore.toggleUsersChangeFlag();
      } else {
        const data: IPutUserRequest = {
          user_id: user_id,
          user_type: role,
        };

        await API.putUser(data);
        generalStore.toggleUsersChangeFlag();
      }
    } catch (err) {
      console.log(err);
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
    // clear form
    reset();
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
                {...register("store_name", {
                  required: true,
                })}
                label="Store Name"
                fullWidth
              />
              {errors.store_name && <span>{errors.store_name.message}</span>}
              <TextField
                {...register("store_address", { required: true })}
                label="Store Address"
                fullWidth
              />
              {errors.store_address && (
                <span>{errors.store_address.message}</span>
              )}
              <TextField
                {...register("phone_no", {
                  required: true,
                  pattern: {
                    value: phoneRegex,
                    message: "Enter a valid phone number",
                  },
                })}
                label="Phone Number"
                fullWidth
              />
              {errors.phone_no && <span>{errors.phone_no.message}</span>}
              <TextField
                {...register("store_email", {
                  required: true,
                  pattern: {
                    value: emailRegex,
                    message: "Enter a valid email address",
                  },
                })}
                label="Store Email"
                fullWidth
              />
              {errors.store_email && <span>{errors.store_email.message}</span>}
              <div
                style={{
                  padding: "0 0 20px",
                  width: "100%",
                  gap: 16,
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                <Button
                  onClick={() => handleClose(false)}
                  color="primary"
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button color="primary" variant="contained" type="submit">
                  Confirm
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
        {selectedRole !== "seller" && (
          <div
            style={{
              padding: "0 24px 20px",
              width: "100%",
              gap: 16,
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <Button
              onClick={() => handleClose(false)}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleClose(true)}
            >
              Confirm
            </Button>
          </div>
        )}
      </Dialog>
    </>
  );
});

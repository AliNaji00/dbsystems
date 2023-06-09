import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { observer } from "mobx-react";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useGeneralStore } from "../../../stores/GeneralStore";
import {
  CustomerRouteNames,
  customerPrefix,
} from "../../customer/router/CustomerRouteNames";
import { API } from "../../network/API";
import { IPostUserRequest } from "../../network/APITypes";
import {
  SellerRouteNames,
  sellerPrefix,
} from "../../seller/router/SellerRouteNames";
import { AnimatedGradient } from "../../ui/Components";
import { emailRegex } from "../../util/Helpers";
import { logo } from "../../util/Images";
import { RouteNames, title } from "../router/RouteNames";

export const RegisterSite = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostUserRequest>();
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const generalStore = useGeneralStore();

  const onSubmit = async (data: IPostUserRequest) => {
    try {
      data.user_type = "customer";
      const response = await API.postUser(data);

      if (response.status === 201) {
        generalStore.loggedIn = true;
        generalStore.userId = response.data.data.user_id;
        generalStore.userName = data.name;
        generalStore.userRoles = ["customer"];
        navigate(customerPrefix(CustomerRouteNames.HOME));
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    if (generalStore.loggedIn) {
      if (generalStore.userRoles.includes("admin")) {
        // TODO navigate to admin site
      } else if (generalStore.userRoles.includes("seller")) {
        navigate(sellerPrefix(SellerRouteNames.DASHBOARD));
      } else if (generalStore.userRoles.includes("customer")) {
        navigate(customerPrefix(CustomerRouteNames.HOME));
      } else {
        navigate(RouteNames.PROFILE);
      }
    }
  }, [generalStore.loggedIn, navigate, generalStore.userRoles]);

  return (
    <>
      <Helmet>
        <title>{title("Login")}</title>
      </Helmet>
      <AnimatedGradient>
        <img
          src={logo}
          alt="logo"
          style={{
            width: 100,
            height: 100,
            position: "absolute",
            top: 80,
            left: 100,
            borderRadius: 5,
          }}
        />
        <Paper elevation={12}>
          <div
            style={{
              padding: 32,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: 400,
            }}
          >
            <h1 style={{ marginBottom: 32 }}>Register</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <TextField
                {...register("name", {
                  required: "Name is required",
                })}
                label="Name"
                variant="outlined"
                fullWidth
                color="primary"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: emailRegex,
                    message: "Enter a valid email address",
                  },
                })}
                label="Email"
                variant="outlined"
                fullWidth
                color="primary"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                {...register("address", {
                  required: "Address is required",
                })}
                label="Address"
                variant="outlined"
                fullWidth
                color="primary"
                error={!!errors.address}
                helperText={errors.address?.message}
              />
              <TextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters",
                  },
                })}
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                color="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Link to={RouteNames.LOG_IN}>
                  <Button variant="outlined" color="primary" size="large">
                    Log in
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      </AnimatedGradient>
    </>
  );
});

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
import { useNavigate } from "react-router-dom";
import { useGeneralStore } from "../../../stores/GeneralStore";
import {
  CustomerRouteNames,
  customerPrefix,
} from "../../customer/router/CustomerRouteNames";
import { API } from "../../network/API";
import { ILoginFormInputs } from "../../network/APITypes";
import { AnimatedGradient } from "../../ui/Components";
import { logo } from "../../util/Images";
import { customColors } from "../../util/Theme";
import { title } from "../router/RouteNames";
import { emailRegex } from "../../util/Helpers";

export const LoginSite = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [invalidCredentials, setInvalidCredentials] = React.useState(false);
  const navigate = useNavigate();

  const generalStore = useGeneralStore();

  const onSubmit = async (data: ILoginFormInputs) => {
    try {
      const response = await API.login(data);

      if (response.status === 200) {
        generalStore.loggedIn = true;
        generalStore.userId = response.data.data.user_id;
        generalStore.userRoles = generalStore.userRoles.concat(
          response.data.data.userroles
        );
        if (response.data.data.ImageURL) {
          generalStore.userImage = response.data.data.ImageURL;
        }
        navigate(customerPrefix(CustomerRouteNames.HOME));
      }
    } catch (e: any) {
      if (e.response && e.response.status === 403) {
        setInvalidCredentials(true);
      }

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
      navigate(customerPrefix(CustomerRouteNames.HOME));
    }
  }, [generalStore.loggedIn, navigate]);

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
            <h1 style={{ marginBottom: 32 }}>Login</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
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
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div style={{ height: 8 }}>
                {invalidCredentials && (
                  <p style={{ color: customColors.tomato, marginTop: 0 }}>
                    Wrong email or password!
                  </p>
                )}
              </div>
              <div style={{ marginTop: 8, textAlign: "end" }}>
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

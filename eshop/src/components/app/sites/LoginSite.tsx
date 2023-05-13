import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { AnimatedGradient } from "../../ui/Components";
import { logo } from "../../util/Images";
import { title } from "../router/RouteNames";
import { API } from "../../network/API";
import { LoginFormInputs } from "../../network/APITypes";

export const LoginSite = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await API.login(data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("finally");
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

  // Validate email
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

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
          }}
        />
        <Paper elevation={12} square>
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
              <div style={{ marginTop: 16, textAlign: "end" }}>
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
};

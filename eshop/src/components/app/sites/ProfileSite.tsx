import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { FilePondFile, registerPlugin } from "filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import * as React from "react";
import { FilePond } from "react-filepond";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useUser } from "../../../stores/useUser";
import { IPutUserRequest } from "../../network/APITypes";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { emailRegex, getImagePath } from "../../util/Helpers";
import { ProfileNavBar } from "../ProfileNavBar";
import { title } from "../router/RouteNames";
import { API } from "../../network/API";
import { observer } from "mobx-react";
import { customColors } from "../../util/Theme";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

export const ProfileSite = observer(() => {
  const [formError, setFormError] = React.useState("");
  const [imageError, setImageError] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [imageKey, setImageKey] = React.useState(0);

  const generalStore = useGeneralStore();

  const userData = useUser(generalStore.userId);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFileUpload = (files: FilePondFile[]) => {
    if (files[0] && files[0].file) {
      setSelectedFile(files[0].file as File);
    }
  };

  const handleSubmitFile = async () => {
    try {
      if (selectedFile && userData) {
        await API.postAvatar(generalStore.userId, selectedFile);
        setIsDialogOpen(false);
        setImageKey((prevKey) => prevKey + 1);
      } else {
        setImageError("No file selected!");
      }
    } catch (e: any) {
      setImageError(e.response.data.msg || "An error occurred");
      console.log(e);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPutUserRequest>({ defaultValues: userData });

  React.useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  const onSubmit = async (data: IPutUserRequest) => {
    try {
      await API.putUser(data);
      generalStore.toggleUserChangeFlag();
      setIsEditing(false);
    } catch (e: any) {
      setFormError(e.response.data.msg || "An error occurred");
      console.log(e);
    }
  };

  return (
    <>
      <Helmet>
        <title>{title("Profile")}</title>
      </Helmet>
      <ProfileNavBar />
      <BackgroundContainer style={{ minHeight: 200 }}>
        {userData && (
          <CenteredContent>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                gap: 128,
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  key={imageKey}
                  src={getImagePath(userData.ImageURL)}
                  alt={userData.name}
                  style={{ alignSelf: "flex-start", width: 300 }}
                />

                <IconButton
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() => setIsDialogOpen(true)}
                >
                  <EditIcon />
                </IconButton>
              </div>
              {isEditing ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    marginRight: 64,
                    width: 500,
                  }}
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
                    type="text"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    fullWidth
                    color="primary"
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
                    type="text"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                    color="primary"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ alignSelf: "flex-start" }}
                  >
                    Save
                  </Button>
                  {formError && (
                    <p style={{ color: customColors.tomato }}>{formError}</p>
                  )}
                </form>
              ) : (
                <div
                  style={{
                    marginRight: 64,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    width: 500,
                  }}
                >
                  <h1>Name: {userData.name}</h1>
                  <h3>Email: {userData.email}</h3>
                  <h3>Address: {userData.address}</h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      maxWidth: 400,
                    }}
                  >
                    <h3>
                      Password:{" "}
                      {showPassword ? userData.password : "•".repeat(8)}
                    </h3>

                    <IconButton onClick={toggleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>

                  <Button
                    variant="contained"
                    size="large"
                    sx={{ alignSelf: "flex-start" }}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </CenteredContent>
        )}
        <Dialog
          open={isDialogOpen}
          onClose={() => {
            setImageError("");
            setIsDialogOpen(false);
          }}
        >
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "48px",
              gap: "32px",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Upload new profile picture</h2>
            <div style={{ height: 280 }}>
              <FilePond
                onupdatefiles={handleFileUpload}
                allowMultiple={false}
                maxFiles={1}
                name="image"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                acceptedFileTypes={["image/jpeg", "image/png"]}
              />
            </div>
            <p style={{ color: customColors.tomato, margin: 0, minHeight: 20 }}>
              {imageError}
            </p>

            <Button variant="contained" size="large" onClick={handleSubmitFile}>
              Submit
            </Button>
          </DialogContent>
        </Dialog>
      </BackgroundContainer>
    </>
  );
});

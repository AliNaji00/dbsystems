import { Button, TextField } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet";
import { getUserResponseMockData } from "../../network/APITypes";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { getImagePath } from "../../util/Helpers";
import { ProfileNavBar } from "../ProfileNavBar";
import { title } from "../router/RouteNames";

export const ProfileSite = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [userData, setUserData] = React.useState(getUserResponseMockData.data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>{title("Profile")}</title>
      </Helmet>
      <ProfileNavBar />
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: 128,
            }}
          >
            <img
              src={getImagePath(userData.ImageURL)}
              alt={userData.name}
              style={{ alignSelf: "flex-start", width: 200 }}
            />
            {isEditing ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 64,
                  gap: 16,
                }}
              >
                <TextField
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
                <TextField
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <TextField
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                />
                <TextField
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                />
                <Button variant="contained" onClick={() => setIsEditing(false)}>
                  Save
                </Button>
              </div>
            ) : (
              <div style={{ marginRight: 64 }}>
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
                <p>{userData.phone}</p>
                <p>{userData.address}</p>
                <Button variant="contained" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </div>
            )}
          </div>
        </CenteredContent>
      </BackgroundContainer>
    </>
  );
};

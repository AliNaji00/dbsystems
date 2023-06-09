import { Button, TextField } from "@mui/material";
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
import { title } from "../../app/router/RouteNames";
import { API } from "../../network/API";
import { IPostProductRequest } from "../../network/APITypes";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { customColors } from "../../util/Theme";
import { SellerNavBar } from "../SellerNavBar";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useNavigate } from "react-router-dom";
import { SellerRouteNames, sellerPrefix } from "../router/SellerRouteNames";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

export const SellerCreateProductSite = () => {
  const [formError, setFormError] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const generalStore = useGeneralStore();
  const navigate = useNavigate();

  const handleFileUpload = (files: FilePondFile[]) => {
    if (files[0] && files[0].file) {
      setSelectedFile(files[0].file as File);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPostProductRequest>();

  // TODO make sure picture posting works
  const onSubmit = async (data: IPostProductRequest) => {
    try {
      data.available = true;
      data.seller_id = generalStore.userId;
      const response = await API.postProduct(data);
      console.log(response);
      setFormError("");
      if (selectedFile) {
        try {
          await API.postProductPicture(
            response.data.data.product_id,
            selectedFile
          );
        } catch (e: any) {
          console.log(e);
        }
      }
    } catch (e: any) {
      setFormError(e.response.data.msg || "An error occurred");
      console.log(e);
    } finally {
      navigate(sellerPrefix(SellerRouteNames.PRODUCTS));
    }
  };

  return (
    <>
      <Helmet>
        <title>{title("Create Product")}</title>
      </Helmet>
      <SellerNavBar />
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          <h2 style={{ margin: "0 0 48px 0" }}>Create Product</h2>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: 20,
            }}
          >
            <div
              style={{
                flex: 11, // This will take up 1/4 of the space
                alignSelf: "flex-start",
                height: 300,
              }}
            >
              <FilePond
                onupdatefiles={handleFileUpload}
                allowMultiple={false}
                maxFiles={1}
                name="image"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                acceptedFileTypes={["image/jpeg", "image/png"]}
              />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 20,
                marginLeft: 48,
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
                {...register("description", {
                  required: "Description is required",
                })}
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                color="primary"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <TextField
                {...register("price", {
                  required: "Prize is required",
                })}
                label="Price"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                variant="outlined"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
                color="primary"
              />
              <TextField
                {...register("stock_quantity", {
                  required: "Stock quantity is required",
                })}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                label="Stock quantity"
                variant="outlined"
                type="number"
                error={!!errors.stock_quantity}
                helperText={errors.stock_quantity?.message}
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
                Create
              </Button>
              {formError && (
                <p style={{ color: customColors.tomato }}>{formError}</p>
              )}
            </form>
          </div>
        </CenteredContent>
      </BackgroundContainer>
    </>
  );
};

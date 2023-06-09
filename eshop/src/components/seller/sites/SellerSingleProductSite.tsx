import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
} from "@mui/material";
import { FilePondFile, registerPlugin } from "filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import { observer } from "mobx-react";
import * as React from "react";
import { FilePond } from "react-filepond";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { useProduct } from "../../../stores/useProduct";
import { title } from "../../app/router/RouteNames";
import { API } from "../../network/API";
import { IPutProductRequest } from "../../network/APITypes";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { getImagePath } from "../../util/Helpers";
import { customColors } from "../../util/Theme";
import { SellerNavBar } from "../SellerNavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import { SellerRouteNames, sellerPrefix } from "../router/SellerRouteNames";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

type ProductIdParam = {
  product_id: string;
};

export const SellerSingleProductSite = observer(() => {
  const { product_id } = useParams<ProductIdParam>();

  const [formError, setFormError] = React.useState("");
  const [imageError, setImageError] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const generalStore = useGeneralStore();
  const navigate = useNavigate();

  const product = useProduct("", product_id);

  const handleFileUpload = (files: FilePondFile[]) => {
    if (files[0] && files[0].file) {
      setSelectedFile(files[0].file as File);
    }
  };

  const handleSubmitFile = async () => {
    try {
      if (selectedFile && product) {
        await API.postProductPicture(product.product_id, selectedFile);
        generalStore.productImageChangeCounter++;
        setIsDialogOpen(false);
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
  } = useForm<IPutProductRequest>({ defaultValues: product });

  React.useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = async (data: IPutProductRequest) => {
    try {
      data.available = true;
      await API.putProduct(data);
      generalStore.toggleProductChangeFlag();
      setFormError("");
      setIsEditing(false);
    } catch (e: any) {
      setFormError(e.response.data.msg || "An error occurred");
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      if (product) {
        const data: IPutProductRequest = {
          available: false,
          ...product,
        };
        await API.putProduct(data);
        setFormError("");
        setIsEditing(false);
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      navigate(sellerPrefix(SellerRouteNames.PRODUCTS));
    }
  };

  return (
    <>
      <Helmet>
        <title>{title(product ? product.name : "")}</title>
      </Helmet>
      <SellerNavBar />
      <BackgroundContainer style={{ minHeight: 200 }}>
        {product && (
          <CenteredContent>
            <div
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <div
                style={{
                  flex: 11, // This will take up 1/4 of the space
                  alignSelf: "flex-start",
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    key={generalStore.productImageChangeCounter}
                    src={getImagePath(product.ImageURL)}
                    alt={product.name}
                    style={{
                      width: "100%", // Adjusts the width to fill the parent container
                      height: "auto",
                    }}
                  />
                  <IconButton
                    style={{ position: "absolute", top: 0, right: 0 }}
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              </div>
              {isEditing ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 20,
                    padding: 20,
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
                    Save
                  </Button>
                  {formError && (
                    <p style={{ color: customColors.tomato }}>{formError}</p>
                  )}
                </form>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 20,
                    padding: 20,
                    marginLeft: 48,
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h2>{product.name}</h2>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      sx={{ backgroundColor: customColors.tomato }}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </div>
                  <p style={{ fontSize: 16, marginBottom: 32 }}>
                    {product.description}
                  </p>
                  {!!product.original_price && (
                    <div style={{ display: "flex" }}>
                      <h4 style={{ flex: 1 }}>
                        <del>Price: $ {product.original_price}</del>
                      </h4>
                      <h4 style={{ color: customColors.green, flex: 4 }}>
                        {product.coupon_code}: {product.coupon_description}
                      </h4>
                    </div>
                  )}
                  <h4
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Price: $ {product.price}
                  </h4>
                  <h4
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Stock: {product.stock_quantity}
                  </h4>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ alignSelf: "flex-start", marginTop: 6 }}
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
            <h2 style={{ textAlign: "center" }}>Upload new product picture</h2>
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

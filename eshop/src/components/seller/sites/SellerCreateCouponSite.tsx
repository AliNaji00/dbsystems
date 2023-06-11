import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGeneralStore } from "../../../stores/GeneralStore";
import { title } from "../../app/router/RouteNames";
import { API } from "../../network/API";
import { IPostCouponRequest } from "../../network/APITypes";
import { CenteredContent } from "../../ui/CenteredContent";
import { BackgroundContainer } from "../../ui/Components";
import { customColors } from "../../util/Theme";
import { SellerNavBar } from "../SellerNavBar";
import { SellerRouteNames, sellerPrefix } from "../router/SellerRouteNames";
import { useProducts } from "../../../stores/useProducts";

export const SellerCreateCouponSite = () => {
  const [formError, setFormError] = React.useState("");

  const generalStore = useGeneralStore();
  useProducts("", "", generalStore.userId);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IPostCouponRequest>({
    defaultValues: generalStore.createCouponDefaultValues,
  });

  const couponType = watch("coupon_type");

  const onSubmit = async (data: IPostCouponRequest) => {
    try {
      data.seller_id = generalStore.userId;
      console.log(data);
      await API.postCoupon(data);
      setFormError("");
    } catch (e: any) {
      setFormError(e.response.data.msg || "An error occurred");
      console.log(e);
    } finally {
      navigate(sellerPrefix(SellerRouteNames.COUPONS));
    }
  };

  return (
    <>
      <Helmet>
        <title>{title("Create Coupon")}</title>
      </Helmet>
      <SellerNavBar />
      <BackgroundContainer style={{ minHeight: 200 }}>
        <CenteredContent>
          <h2 style={{ margin: "0 0 48px 0" }}>Create Coupon</h2>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: 20,
            }}
          >
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
              <Controller
                name="coupon_type"
                control={control}
                defaultValue="special_event"
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="seasonal"
                      control={<Radio />}
                      label="Seasonal"
                    />
                    <FormControlLabel
                      value="special_event"
                      control={<Radio />}
                      label="Special Event"
                    />
                    <FormControlLabel
                      value="shipping"
                      control={<Radio />}
                      label="Shipping"
                    />
                  </RadioGroup>
                )}
              />

              <TextField
                {...register("description", {
                  required: "Description is required",
                })}
                label="Description"
                variant="outlined"
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              <Controller
                name="start_time"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Start Time"
                    views={["year", "month", "day"]}
                  />
                )}
              />

              <Controller
                name="end_time"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="End Time"
                    views={["year", "month", "day"]}
                  />
                )}
              />

              {couponType === "shipping" && (
                <TextField
                  {...register("threshold", {
                    required: "Threshold is required",
                    min: {
                      value: 0,
                      message: "Threshold cannot be less than 0",
                    },
                  })}
                  label="Threshold"
                  type="number"
                  variant="outlined"
                  error={!!errors.threshold}
                  helperText={errors.threshold?.message}
                />
              )}

              {(couponType === "special_event" ||
                couponType === "seasonal") && (
                <TextField
                  {...register("percentage", {
                    required: "Percentage is required",
                    min: {
                      value: 0,
                      message: "Percentage cannot be less than 0",
                    },
                    max: {
                      value: 100,
                      message: "Percentage cannot be more than 100",
                    },
                  })}
                  label="Percentage"
                  type="number"
                  variant="outlined"
                  error={!!errors.percentage}
                  helperText={errors.percentage?.message}
                />
              )}

              <Controller
                name="product_ids"
                control={control}
                defaultValue={[]}
                render={() => (
                  <div>
                    {couponType === "special_event" && (
                      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                        {generalStore.products.map((product) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setValue("product_ids", [
                                      ...watch("product_ids"),
                                      product.product_id,
                                    ]);
                                  } else {
                                    setValue(
                                      "product_ids",
                                      watch("product_ids").filter(
                                        (id: number) =>
                                          id !== product.product_id
                                      )
                                    );
                                  }
                                }}
                              />
                            }
                            label={product.name}
                            key={product.product_id}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              />

              {formError && (
                <p style={{ color: customColors.tomato }}>{formError}</p>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ alignSelf: "flex-end" }}
              >
                Submit
              </Button>
            </form>
          </div>
        </CenteredContent>
      </BackgroundContainer>
    </>
  );
};

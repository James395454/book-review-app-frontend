import React from "react";

import { useField } from "formik";

import RatingPage from "../../rating/ratingComponent";

function CustomRatingComponent({ onRatingChanged, ...props }: any) {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const hasError = !!errorText || props.error;

  return (
    <div style={hasError ? { color: "red" } : {}}>
      <RatingPage
        name="rating"
        onRatingChanged={onRatingChanged}
        {...field}
        {...props}
      />

      {hasError && <div className="error-text">Rating is required</div>}
    </div>
  );
}

export default CustomRatingComponent;

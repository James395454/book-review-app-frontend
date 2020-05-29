import React, { useState } from "react";
import { MDBContainer, MDBRating } from "mdbreact";

const RatingPage = ({ onRatingChanged, ...props }: any) => {
  const [basic] = useState([
    {
      tooltip: "Very Bad",
    },
    {
      tooltip: "Poor",
    },
    {
      tooltip: "Ok",
      choosed: true,
    },
    {
      tooltip: "Good",
    },
    {
      tooltip: "Excellent",
    },
  ]);

  return (
    <MDBContainer>
      <MDBRating data={basic} getValue={onRatingChanged} {...props} />
    </MDBContainer>
  );
};

export default RatingPage;

import axios from "axios";

import * as endpoints from "./urlService";
import { ReviewCreation } from "../interfaces/review";

export async function submitReview(review: ReviewCreation) {
  const result = await axios.post(endpoints.REVIEW_ENDPOINT, review, {
    headers: { contentType: "application/json" },
    withCredentials: true,
  });
  return result;
}

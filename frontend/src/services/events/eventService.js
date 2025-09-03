import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

// Get the token
const token = getUserFromStorage();

export const EventAPI = async ({ eventid, eventname, eligibility, startdate, enddate, venue ,description}) => {
  const response = await axios.post(
    `${BASE_URL}/edit/addeve`,
    {
      eventid,
      eventname,
      eligibility,
      startdate,
      enddate,
      venue,
      description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
    }
  );

  // Return a promise
  return response.data;
}

export const deleteEventAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};

"use client";
import axios from "axios";
import { useEffect } from "react";

const UpdateProfileCount = ({ userId }: any) => {
  useEffect(() => {
    const incrementProfileView = async () => {
      const viewedProfiles = JSON.parse(
        localStorage.getItem("viewedProfiles") || "{}"
      );

      const now = new Date().getTime();
      const lastViewed = viewedProfiles[userId] || 0;

      const ONE_HOUR = 60 * 60 * 1000;

      if (now - lastViewed > ONE_HOUR) {
        try {
          await axios.patch(`/api/user/${userId}`);

          viewedProfiles[userId] = now;
          localStorage.setItem(
            "viewedProfiles",
            JSON.stringify(viewedProfiles)
          );
        } catch (error) {
          console.error("Error incrementing profile view:", error);
        }
      }
    };
    incrementProfileView();
  }, [userId]);
  return <div></div>;
};
export default UpdateProfileCount;

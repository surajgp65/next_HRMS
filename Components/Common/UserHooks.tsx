import { useEffect, useState } from "react";
import { getLoggedinUser } from "Components/helpers/api_helper";

const useProfile = () => {
  const userProfileSession = getLoggedinUser();
  const [loading, setLoading] = useState(userProfileSession ? false : true);
  const [userProfile, setUserProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  useEffect(() => {
    const userProfileSession = getLoggedinUser();
    setUserProfile(userProfileSession ? userProfileSession : null);
    setLoading(userProfileSession ? false : true);
  }, []);


  return { userProfile, loading};
};

export { useProfile };
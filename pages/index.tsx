import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import { useProfile } from "@common/UserHooks";



export default function Index() {
  const dispatch: any = useDispatch();
  const router = useRouter()
  const { userProfile, loading } = useProfile();

  useEffect(() => {
    // if (!userProfile && loading) {
    //   router.push("/auth/login");
    // } else {
    // }
    router.push("/dashboard");
  }, [router, loading, userProfile]);

}
import React from "react";
import { db } from "../config/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";

const SubmitData = ({
  guestName,
  setUpdateStatus,
  setDetails,
  setInvite,
  setExpand,
}) => {
  const guestList = doc(collection(db, "guest"));
  // const testData = {
  //   firstName: "Dummy first name",
  //   lastName: "Dummy last name",
  //   attend: false,
  //   numberOfAttendees: 2,
  //   nameOfCompanions: ["First Companion", "Second Companion"],
  // };

  const addGuest = async () => {
    try {
      const newGuest = await setDoc(guestList, guestName);
      setInvite(2);
      setExpand("");
      setUpdateStatus((status) => ({ ...status, success: true }));
      setDetails((details) => ({ ...details, load: true }));
      setTimeout(() => {
        setDetails((details) => ({ ...details, verify: true }));
      }, 3000);
    } catch (err) {
      if (err) {
        setTimeout(() => {
          setUpdateStatus((status) => ({ ...status, error: true }));
        }, 2000);
      }
      console.log(err);
    }
  };

  const triggerLoadingState = () => {
    setUpdateStatus((status) => ({ ...status, success: true }));
    setDetails((details) => ({ ...details, load: true }));
    setInvite(2);
    setExpand("");
    setTimeout(() => {
      setDetails((details) => ({ ...details, verify: true }));
    }, 3000);
  };

  return (
    <div className="basis-1/2">
      <Button
        className="size-full rounded-full bg-ivory text-black"
        // onClick={() => addGuest()}
        onClick={() => triggerLoadingState()}
      >
        Submit
      </Button>
    </div>
  );
};

export default SubmitData;

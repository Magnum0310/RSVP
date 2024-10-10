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
  const addGuest = async () => {
    try {
      setUpdateStatus((status) => ({ ...status, success: true }));
      setDetails((details) => ({ ...details, load: true }));
      const newGuest = await setDoc(guestList, guestName);
      setInvite(2);
      setExpand("");
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
    // setDetails((details) => ({ ...details, verify: true }));
    setTimeout(() => {
      setDetails((details) => ({ ...details, verify: true }));
    }, 3000);
  };

  return (
    <Button
      className="h-full max-w-[15rem] basis-1/2 rounded-full bg-ivory text-black"
      // onClick={() => addGuest()}
      onClick={() => triggerLoadingState()}
    >
      Submit
    </Button>
  );
};

export default SubmitData;

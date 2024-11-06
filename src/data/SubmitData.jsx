import React from "react";
import { db } from "../config/firebase";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";

const SubmitData = ({
  guestName,
  setUpdateStatus,
  setDetails,
  setInvite,
  setExpand,
  setShowAcceptMessage,
}) => {
  const addGuest = async () => {
    const guestId =
      guestName.firstName.split(" ").join("") + guestName.lastName;
    try {
      const checkDocument = doc(db, "guest", guestId.toLocaleLowerCase());
      console.log(guestId);
      const checkGuest = await getDoc(checkDocument);
      console.log(checkGuest.exists());
      if (checkGuest.exists()) {
        // setDetails((details) => ({ ...details, guestExist: true }));

        setUpdateStatus((status) => ({ ...status, success: true }));
        setDetails((details) => ({ ...details, load: true }));
        setInvite(2);
        setExpand("");
        setShowAcceptMessage(1);
        setTimeout(() => {
          setDetails((details) => ({
            ...details,
            verify: true,
            guestExist: true,
          }));
        }, 3000);
        return;
      } else {
        const newGuest = await setDoc(
          doc(db, "guest", guestId.toLocaleLowerCase()),
          guestName,
        );
        console.log("else");
        setUpdateStatus((status) => ({ ...status, success: true }));
        setDetails((details) => ({ ...details, load: true }));
        // const newGuest = await setDoc(guestList, guestId, guestName);
        setInvite(2);
        setExpand("");
        setShowAcceptMessage(1);
        setTimeout(() => {
          setDetails((details) => ({ ...details, verify: true }));
        }, 3000);
      }
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
    setShowAcceptMessage(1);
    // setDetails((details) => ({ ...details, verify: true }));
    setTimeout(() => {
      setDetails((details) => ({ ...details, verify: true }));
    }, 3000);
  };

  return (
    <button
      className="h-full max-w-[15rem] basis-1/2 rounded-full bg-ivory font-bold text-black duration-200 hover:scale-[1.05] hover:ease-in-out"
      onClick={() => addGuest()}
      // onClick={() => triggerLoadingState()}
    >
      Submit
    </button>
  );
};

export default SubmitData;

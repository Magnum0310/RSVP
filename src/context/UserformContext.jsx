import { createContext, useState } from "react";

const UserformContext = createContext();

export const UserFormProvider = ({ children }) => {
  //=====Guest details=====//
  const [guest, setGuest] = useState({
    firstName: "",
    lastName: "",
    companion: false,
    numberOfAttendees: 0,
    nameOfCompanions: [],
  });
  const [updateStatus, setUpdateStatus] = useState({
    success: false,
    error: false,
  });
  //=====Check Errors=====//
  const [errors, setErrors] = useState();

  //=====Accept Invite=====//
  const [invite, setInvite] = useState(2);

  //=====Confirm companion=====//
  const [plusOne, setPlusOne] = useState(false);

  //=====State Details=====//
  const [details, setDetails] = useState({
    home: false,
    verify: false,
    submit: false,
    load: false,
  });
  //=====Add Companion=====//
  const [companion, setCompanion] = useState("");

  console.log(guest);

  return (
    <UserformContext.Provider
      value={{
        guest,
        setGuest,
        updateStatus,
        setUpdateStatus,
        errors,
        setErrors,
        invite,
        setInvite,
        plusOne,
        setPlusOne,
        details,
        setDetails,
        companion,
        setCompanion,
      }}
    >
      {children}
    </UserformContext.Provider>
  );
};

export default UserformContext;

import {
  useState,
  React,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";
import UserformContext from "@/context/UserformContext";
import Frame from "./Frame";
// import { useContext } from "react";
// import Image from "../constants/Image";
// import UserformContext from "@/context/UserformContext";

//==============================//
import SubmitData from "../data/SubmitData";
import Image from "../constants/Image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

// Textfield
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// Checkbox
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// Button
import Button from "@mui/material/Button";
// List
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";

gsap.registerPlugin(Flip);

const UserForm = ({ statePanel, setPanel, stateForm, setForm }) => {
  const {
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
  } = useContext(UserformContext);

  const { frame } = Image;
  const { width } = useContext(UserformContext);

  // REFACTOR STATES
  const [formState, setFormState] = useState(2);
  const [showAcceptMessage, setShowAcceptMessage] = useState(0);
  const [showVerifyMessage, setShowVerifyMessage] = useState(0);
  const [showDeclineMessage, setShowDeclineMessage] = useState(0);

  //===============Images===============//
  const {
    userformBorder,
    acceptButtonIcon,
    acceptOrnamentActiveButton,
    acceptOrnamentInactiveButton,
    declineButtonIcon,
    declineOrnamentActiveButton,
    declineOrnamentInactiveButton,
    activeOrnament,
    inactiveOrnament,
    deleteIcon,
  } = Image;

  //===============STATES===============//

  //=====Verify form=====//
  const [verify, setVerify] = useState(false);

  //=====Accept form=====//
  const [acceptForm, setAcceptForm] = useState();

  const handleAcceptForm = (status) => {
    console.log("click");
    // setInvite(0);
    setExpand(true);
    setAcceptForm(status);
  };

  //=====Submitting Details Animation=====//

  const submitContainer = useRef();
  const submitOrnament = useRef();
  const successContainer = useRef();

  useGSAP(() => {
    if (details.load) {
      gsap.to(submitOrnament.current, {
        rotation: "+=360",
        duration: 30,
        repeat: -1,
        opacity: 1,
      });
    } else {
      gsap.to(submitOrnament.current, {
        rotation: "+0",
        duration: 0,
        repeat: 0,
        opacity: 0,
      });
    }
  }, [details.load]);

  //=====Success Details Animation=====//

  useGSAP(() => {
    if (details.verify) {
      gsap.to(successContainer.current, {
        duration: 2,
        opacity: 1,
      });
    } else {
      gsap.to(successContainer.current, {
        duration: 0,
        opacity: 0,
      });
    }
  }, [details.verify]);

  const declineForm = useRef();
  const declineMessage = useRef();

  useGSAP(() => {
    if (showDeclineMessage) {
      gsap.to([declineForm.current, declineMessage.current], {
        // rotation: "+=360",
        duration: 0.5,
        ease: "power3.inOut",
        // repeat: -1,
        opacity: 1,
        display: "flex",
      });
    } else {
      gsap.to([declineForm.current, declineMessage.current], {
        // rotation: "+0",
        duration: 0,
        // repeat: 0,
        opacity: 0,
        display: "none",
      });
    }
  }, [showDeclineMessage]);

  //=====Handle checkbox=====//
  const handleCheckbox = () => {
    setGuest((guest) => ({
      ...guest,
      companion: !guest.companion,
      nameOfCompanions: [],
      numberOfAttendees: 0,
    }));
    setCompanion("");
    setErrors((errors) => ({ ...errors, companion: "" }));
    setPlusOne(!plusOne);
  };

  //=====Handle Name Details=====//
  const handleChange = (e) => {
    setGuest(() => ({ ...guest, [e.target.name]: e.target.value }));
  };

  //=====Handle Companion=====//
  const handleCompanion = (e) => {
    setCompanion(() => e.target.value);
  };

  //=====Handle add companion=====//
  const handleAddCompanion = () => {
    const error = {};
    const validate = /^\s*$/;

    if (validate.test(companion) || companion.length < 3) {
      error.companion = "Must have at least 3 characters";
      setErrors((errors) => ({ ...errors, ...error }));
      return;
    }

    if (Object.keys(error).length === 0) {
      setErrors((errors) => ({ ...errors, companion: "" }));
      setGuest((guest) => ({
        ...guest,
        nameOfCompanions: [...guest.nameOfCompanions, companion],
        numberOfAttendees: guest.numberOfAttendees + 1,
      }));
      setCompanion("");
    }
  };

  //=====Handle remove companion=====//
  const handleRemoveCompanion = (index) => {
    // if (numberOfAttendees > 0) {
    const newList = guest.nameOfCompanions.filter((_, i) => i !== index);
    setGuest((guest) => ({
      ...guest,
      nameOfCompanions: newList,
      numberOfAttendees: guest.numberOfAttendees - 1,
    }));
    // }
  };

  //=====Handle submit form=====//
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const validateName = /^[A-Za-z0-9 ]{3,}$/;

    if (!validateName.test(guest.firstName)) {
      newErrors.firstName =
        "Enter a valid first name. Must have at least 3 characters and no special characters";
    }
    if (!validateName.test(guest.lastName)) {
      newErrors.lastName =
        "Enter a valid last name. Must have at least 3 characters and no special characters";
    }
    setErrors((errors) => ({ ...errors, ...newErrors }));

    if (Object.keys(newErrors).length === 0) {
      setAcceptForm(false);
      setShowVerifyMessage(1);
      setInvite(1);
      setExpand(false);
      setErrors((errors) => ({ ...errors, firstName: "", lastName: "" }));
      setDetails((details) => ({ ...details, submit: true }));
      return;
    }
  };

  //=====Handle home=====//
  const handleHomePage = () => {
    // setInvite(2);
    // setExpand("");
    setGuest({
      firstName: "",
      lastName: "",
      companion: false,
      numberOfAttendees: 0,
      nameOfCompanions: [],
    });
    setDetails({ home: false, verify: false, submit: false, load: false });
    setPlusOne(false);
    // setDetails((details)=>({}))
  };

  function renderRow(props) {
    const { index, style } = props;
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <div className="relative flex h-full w-full">
            <ListItemText
              primary={`${guest.nameOfCompanions[index]}`}
              className={`${details.submit ? "w-full text-center" : "w-[85%]"} `}
            />
            <ListItemText
              secondary={
                <div
                  style={{
                    backgroundImage: `url("${deleteIcon}")`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                  className={`${details.submit ? "hidden" : "block size-[1.3rem] bg-[#808080] text-center text-black"}`}
                  onClick={() => handleRemoveCompanion(index)}
                ></div>
              }
            />
          </div>
        </ListItemButton>
      </ListItem>
    );
  }

  const [expand, setExpand] = useState("");
  const state1 = Flip.getState(".accept", { simple: true });
  const state2 = Flip.getState(".decline", { simple: true });
  const declineFormState = Flip.getState(".declineForm", { simple: true });

  const config = {
    ease: "power1.Out",
    duration: 0.5,
    scale: true,
    stagger: 0.5,
  };
  const config1 = {
    ease: "power4.inOut",
    duration: 2,
    opacity: 1,
    stagger: 0.5,
    scale: true,
  };

  useLayoutEffect(() => {
    if (!state1) return;
    Flip.from(state1, config);
    if (!state2) return;
    Flip.from(state2, config);
  }, [expand]);
  useLayoutEffect(() => {
    if (declineFormState) return;
    Flip.from(declineFormState, config1);
  }, [acceptForm]);

  const boxRef = useRef(null);
  const boxRightRef = useRef(null);
  const acceptRef = useRef(null);
  const declineRef = useRef(null);

  useEffect(() => {
    //=====Initialize Ref=====//
    const boxes = boxRef.current?.querySelectorAll(".box");
    const rightBoxes = boxRightRef.current?.querySelectorAll(".boxRight");
    const acceptButton = acceptRef.current?.querySelectorAll(".acceptButton");
    const declineButton =
      declineRef.current?.querySelectorAll(".declineButton");

    //=====Get the state of the boxes before any animation=====//
    const state = Flip.getState(boxes);
    const stateRightBox = Flip.getState(rightBoxes);
    const acceptState = Flip.getState(acceptButton);
    const declineState = Flip.getState(declineButton);

    //=====Apply the changes based on the toggled state=====//
    //=====Active State=====//
    if (expand) {
      //=====UserForm=====//
      gsap.set(boxes[0], {
        duration: 1,
        scale: 1,
        x: 0,
        opacity: 1,
        ease: "power2.inOut",
      });
      gsap.set([boxes[1], boxes[2], boxes[3], boxes[4], boxes[5]], {
        duration: 0.5,
        x: 0,
        scaleX: 1,
        opacity: 1,
        ease: "power2.inOut",
      });
      //=====Decline Form=====//
      gsap.set(rightBoxes[0], {
        duration: 1,
        scale: 1,
        opacity: 1,
        ease: "power2.inOut",
      });

      // gsap.set(rightBoxes[1], {
      //   duration: 1,
      //   scale: 0,
      //   opacity: 0,
      //   ease: "power2.inOut",
      // });

      //=====Accept Button =====//
      gsap.set([acceptButton[0], acceptButton[1]], {
        duration: 1,
        scaleX: 0,
        opacity: 0,
        ease: "power2.inOut",
      });
      gsap.set([declineButton[0]], {
        duration: 1,
        scaleX: 1,
        opacity: 1,
        ease: "power2.inOut",
      });

      gsap.set([declineButton[1]], {
        duration: 1,
        scaleX: 1,
        opacity: "25%",
        ease: "power2.inOut",
      });
    }
    //=====Default State=====//
    else {
      //=====Outer Userform=====//
      gsap.set(boxes[0], {
        // duration: 1,
        scale: 1,
        x: 0,
        opacity: 0,
        ease: "power2.inOut",
      });
      gsap.set([boxes[1], boxes[2], boxes[3], boxes[4], boxes[5]], {
        duration: 1,
        x: -100,
        scaleX: 0,
        opacity: 0,
        ease: "power2.inOut",
      });
      //=====Decline Userform=====//
      gsap.set(rightBoxes[0], {
        scaleX: 1,
        opacity: 1,
        // scaleX: `${invite === 2 ? 0 : 1}`,
        // opacity: `${invite === 2 ? 0 : 1}`,
        ease: "power2.inOut",
      });

      //=====Accept Button=====//
      gsap.set([acceptButton[0]], {
        duration: 1,
        scaleX: 1,
        opacity: "25%",
        ease: "power2.inOut",
      });
      gsap.set([acceptButton[1]], {
        duration: 1,
        x: 0,
        scaleX: 1,
        opacity: 1,
        ease: "power2.inOut",
      });

      //=====Decline Button=====//
      gsap.set([declineButton[0]], {
        duration: 1,
        x: 0,
        scaleX: `${formState === 2 ? 1 : 0}`,
        opacity: `${formState === 2 ? 1 : 0}`,
        ease: "power2.inOut",
      });
      gsap.set([declineButton[1]], {
        duration: 1,
        x: 0,
        scaleX: `${formState === 2 ? 1 : 0}`,
        opacity: `${formState === 2 ? 0 : "25%"}`,
        ease: "power2.inOut",
      });
    }
    //=====Animate the transition from the previous state to the current state=====//
    Flip.from(state, {
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.inOut",
      scale: true,
      nested: true,
    });
    Flip.from(stateRightBox, {
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.inOut",
      scale: true,
      nested: true,
    });
    Flip.from(acceptState, {
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.inOut",
      scale: true,
      nested: true,
    });
    Flip.from(declineState, {
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.inOut",
      scale: true,
      nested: true,
    });
  }, [expand]);

  return (
    <div className="relative">
      <div className="relative flex h-screen w-full flex-col justify-center gap-5 font-Coldiac">
        <div className="h-[80%] w-full">
          {/* Buttons */}
          <div className="flex size-full items-center justify-center">
            {/* Accept invitation */}
            <div
              ref={boxRef}
              className={`flex ${formState === 0 && showDeclineMessage === 1 ? "basis-[0%]" : formState === 1 ? "basis-[85%]" : formState === 0 ? "basis-[20%]" : "basis-1/2"} accept relative h-full flex-col items-center justify-center gap-2`}
            >
              <Box
                className={`box ${formState === 1 ? "flex" : "hidden"} z-20 size-[85%] flex-col gap-5 ${(plusOne && errors?.firstName) || errors?.lastName ? "overflow-y-scroll" : "justify-center"} justify-center border-0 border-solid border-motif p-5 max-lg:max-w-[90%] lg:max-w-[75%]`}
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                  // Target all input fields inside the Box component
                  "& .MuiTextField-root": {
                    marginBottom: "2px", // Add space between text fields
                  },
                  "& .MuiInputLabel-root": {
                    color: "black", // Label color
                    fontFamily: "'Coldiac', sans-serif", // Font family for input text
                    fontWeight: "bold",
                    borderRadius: "5px",
                    paddingX: "5px",
                    fontSize: "14px",
                  },
                  "& label.Mui-focused": {
                    color: "black",
                    fontWeight: "bold",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "'Coldiac'",
                    color: "black",
                    fontWeight: "bold",
                    backgroundColor: "ivory",
                    fontSize: "16px",

                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                      fontFamily: "'Coldiac'",
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "ivory", // Default border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "ivory", // Border color on hover
                  },
                  "& .MuiTypography-root": {
                    color: "ivory", // Default label color
                    fontFamily: '"Coldiac", sans-serif', // Change font family for the label
                    fontSize: "14px", // Change font size for the label
                    "&.Mui-checked": {
                      color: "ivory", // Label color when checked
                    },
                  },
                }}
              >
                <div className="mb-5 w-full text-center text-3xl text-ivory underline lg:text-5xl">
                  Guest Details
                </div>
                <TextField
                  size="small"
                  className="box"
                  required
                  id="outlined-firstName"
                  name="firstName"
                  label="First name"
                  type="text"
                  value={guest.firstName}
                  onChange={handleChange}
                />
                {errors?.firstName && (
                  <p className="text-xs text-ivory">{errors?.firstName}</p>
                )}
                <TextField
                  size="small"
                  className="box"
                  required
                  id="outlined-lastName"
                  name="lastName"
                  label="Last name"
                  type="text"
                  value={guest.lastName}
                  onChange={handleChange}
                />
                {errors?.lastName && (
                  <p className="text-xs text-ivory">{errors?.lastName}</p>
                )}
                {/* Verify Plus One */}
                <FormControlLabel
                  className="box w-fit"
                  control={
                    <Checkbox
                      checked={plusOne}
                      onChange={() => handleCheckbox()}
                      style={{
                        color: "ivory",
                      }}
                    />
                  }
                  label="Any companions?"
                />
                {/* Add full name of companion */}
                <div
                  className={` ${plusOne ? "block" : "hidden"} justify-left flex w-full flex-col items-center gap-3`}
                >
                  <div className="flex size-full items-center gap-2">
                    <TextField
                      size="small"
                      className="basis-[85%]"
                      required
                      id="outlined-fullName"
                      name="fullName"
                      label="Full name"
                      type="text"
                      value={companion}
                      onChange={handleCompanion}
                    />
                    <Button
                      className="h-[85%] basis-[15%]"
                      disabled={companion.length < 3 ? true : false}
                      type="submit"
                      onClick={() => handleAddCompanion()}
                      variant="outlined"
                      sx={{
                        backgroundColor: `${companion.length < 3 ? "gray" : "ivory"}`, // Change background color
                        color: "black", // Change text color
                        fontFamily: '"Coldiac", monospace', // Change font family
                        fontSize: "16px", // Change font size
                        "&:hover": {
                          backgroundColor: "barley", // Background color on hover
                          borderColor: "barley", // Border color on hover
                          color: "barley", // Text color on hover
                        },
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  {errors?.companion && (
                    <p className="text-base">{errors?.companion}</p>
                  )}
                </div>
                {/* Display companion */}
                {guest.nameOfCompanions.length != 0 && (
                  <Box
                    sx={{
                      width: "100%",
                      height: 100,
                      // backgroundColor: "ivory",
                      borderColor: "ivory",
                    }}
                  >
                    <FixedSizeList
                      height={100}
                      width="100%"
                      itemSize={30}
                      itemCount={guest.nameOfCompanions?.length}
                      overscanCount={5}
                    >
                      {renderRow}
                    </FixedSizeList>
                  </Box>
                )}
                {/* <Button
                  className="box"
                  variant=""
                  onClick={() => handleSubmit()}
                  sx={{
                    height: "7%",
                    backgroundColor: "ivory", // Change background color
                    color: "black", // Change text color
                    fontFamily: '"Coldiac", monospace', // Change font family
                    fontSize: "16px", // Change font size
                    "&:hover": {
                      backgroundColor: "ivory", // Background color on hover
                      borderColor: "black", // Border color on hover
                      scale: ".5", // Text color on hover
                    },
                  }}
                >
                  Submit
                </Button> */}
                <button
                  className="box h-[7%] w-full rounded-lg bg-ivory font-bold"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </Box>
              {/* ADDING Background Image */}
              <div
                ref={acceptRef}
                className={`absolute ${formState === 1 ? "basis-[85%]" : formState === 0 ? "basis-20" : "basis-1/2"} flex size-[95%] flex-col items-center justify-center rounded-xl bg-motif`}
              >
                {/* Default View - hidden flex*/}
                <div
                  className={`absolute ${(formState === 1 && !showAcceptMessage) || (formState === 2 && !showAcceptMessage) ? "flex" : formState === 1 && showAcceptMessage === 1 ? "hidden" : "hidden"} h-[50%] w-[80%] opacity-25`}
                >
                  <div
                    className="basis-1/2 rotate-180"
                    style={{
                      backgroundImage: `url(${inactiveOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      scale: "1",
                    }}
                  ></div>
                  <div
                    className="basis-1/2"
                    style={{
                      backgroundImage: `url(${inactiveOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      scale: "1",
                    }}
                  ></div>
                </div>
                {/* Inactive View */}
                <div
                  className={`absolute top-1/2 ${formState === 2 ? "hidden" : formState === 0 && "flex"} acceptButton size-[95%] -translate-y-1/2 flex-col justify-between overflow-clip opacity-25`}
                >
                  <div
                    className="basis-[35%]"
                    style={{
                      backgroundImage: `url(${inactiveOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "top",
                      scale: "1.1",
                    }}
                  ></div>
                  <div
                    className="basis-[35%] rotate-180"
                    style={{
                      backgroundImage: `url(${inactiveOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "top",
                      scale: "1.1",
                    }}
                  ></div>
                </div>
                {/* Active Form View */}
                <div
                  className={`absolute top-1/2 ${formState === 2 ? "hidden" : showVerifyMessage === 1 ? "hidden" : formState === 1 ? "flex" : "hidden"} size-[95%] -translate-y-1/2 flex-col justify-between overflow-clip opacity-75`}
                >
                  <div
                    className="relative -top-1/4 right-1/2 basis-[50%]"
                    style={{
                      backgroundImage: `url(${activeOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      scale: "1",
                    }}
                  ></div>
                  <div
                    className="relative left-1/2 top-1/4 basis-[50%] rotate-180"
                    style={{
                      backgroundImage: `url(${activeOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      scale: "1",
                    }}
                  ></div>
                </div>
                <div
                  onClick={() => {
                    setFormState(1);
                    setExpand(true);
                  }}
                  className={`relative ${showVerifyMessage === 0 ? "flex" : "hidden"} z-10 size-full flex-col items-center justify-center gap-10`}
                >
                  <div
                    className={`acceptButton grid ${formState === 2 ? "size-[40%] lg:size-[55%]" : formState === 1 ? "size-[50%]" : "size-[35%]"} place-content-center`}
                    style={{
                      backgroundImage: `url("${acceptButtonIcon}")`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <p
                    className={`w-full ${formState === 2 ? "block" : "hidden"} text-center text-2xl font-bold text-ivory`}
                  >
                    Accept
                  </p>
                </div>
                {/* Verify Details  */}
                <div
                  className={` ${details.load ? "hidden" : showVerifyMessage === 1 && formState === 1 ? "flex" : "hidden"} size-full flex-col items-center justify-center gap-5 text-ivory`}
                >
                  <p className="text-center text-3xl lg:text-5xl">
                    Verify details
                  </p>
                  <div className="flex w-full basis-[55%] flex-col items-center justify-center gap-5 px-5 text-xl max-lg:max-w-[90%] lg:max-w-[75%]">
                    {/* Verify Details */}
                    <div className="flex flex-col items-center">
                      <label className="text-base" htmlFor="fullname">
                        Full Name:
                      </label>
                      <p
                        id="fullname"
                        className="text-sm md:text-xl lg:text-2xl"
                      >
                        {guest.firstName} {guest.lastName}
                      </p>
                    </div>
                    <span className="flex items-center gap-2">
                      <p className="text-base">Total number of companion/s:</p>
                      <p>{`${guest.numberOfAttendees}`}</p>
                    </span>
                    {guest.nameOfCompanions.length != 0 && (
                      <Box
                        className="relative z-50"
                        sx={{
                          width: "100%",
                          // height: 50,
                          height: 100,
                          "& .MuiTypography-root": {
                            color: "ivory", // Default label color
                            fontFamily: '"Coldiac", sans-serif',
                          },
                        }}
                      >
                        <FixedSizeList
                          height={150}
                          width="100%"
                          itemSize={30}
                          itemCount={guest.nameOfCompanions?.length}
                          overscanCount={5}
                        >
                          {renderRow}
                        </FixedSizeList>
                      </Box>
                    )}
                  </div>
                  {/* Submit form buttons */}
                  <div className="relative z-50 flex h-[3rem] w-3/4 justify-center gap-5">
                    <SubmitData
                      guestName={guest}
                      setUpdateStatus={setUpdateStatus}
                      setDetails={setDetails}
                      setInvite={setInvite}
                      setExpand={setExpand}
                      setShowAcceptMessage={setShowAcceptMessage}
                      handleAcceptForm={handleAcceptForm}
                    />
                    <div className="size-full max-w-[15rem] basis-1/2 place-content-center rounded-full bg-returnButton text-ivory duration-200 hover:scale-[1.05] hover:ease-in-out">
                      <button
                        onClick={() => {
                          handleAcceptForm(true);
                          setShowVerifyMessage(0);
                          setInvite(1);
                          setDetails((details) => ({
                            ...details,
                            submit: false,
                          }));
                        }}
                        className="w-full font-bold text-ivory"
                      >
                        <p className="text-ivory">Return</p>
                      </button>
                    </div>
                    {/* Background Image */}
                    <div
                      className={`absolute top-1/2 -z-10 flex size-[94%] -translate-y-1/2 flex-col justify-between overflow-clip opacity-[.10]`}
                    >
                      <div
                        className="relative top-1/2 basis-[50%] -translate-y-1/2"
                        style={{
                          backgroundImage: `url(${activeOrnament})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          scale: "1",
                        }}
                      ></div>
                    </div>
                  </div>
                  {/* Submitting Details */}
                  <div className="absolute z-20 size-[95%] border-4 border-solid border-ivory"></div>
                </div>
                {/* Submit Details - inview*/}
                <div
                  className={` ${details.load ? "flex" : "hidden"} z-50 h-full w-[100%] flex-col items-center justify-center gap-5 text-4xl text-ivory`}
                >
                  {!details.verify && (
                    <div
                      // ref={submitContainer}
                      className="absolute flex size-[94%] flex-col items-center justify-center"
                    >
                      <p className="text-base md:text-3xl lg:text-5xl">
                        Submitting Details...
                      </p>
                      <div
                        ref={submitOrnament}
                        className="absolute flex size-[75%] opacity-25"
                        style={{
                          backgroundImage: `url(${activeOrnament})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          scale: "1",
                        }}
                      ></div>
                    </div>
                  )}
                  {details.verify && (
                    <div
                      ref={successContainer}
                      className="flex size-[95%] flex-col items-center justify-center gap-8 text-ivory opacity-0 sm:gap-16"
                    >
                      <p
                        className={`${details.guestExist ? "w-1/2 text-center" : ""} text-userfor-title font-bold`}
                      >
                        {details.guestExist
                          ? "Attendance Confirmed"
                          : "Success!"}
                      </p>
                      {/* SUCCESS MESSAGE */}
                      <div className="text-userform flex w-[80%] flex-col gap-5 lg:gap-10">
                        {/* <div className="flex w-[80%] flex-col gap-5 text-base md:text-xl lg:gap-10 lg:text-2xl"> */}
                        <p>Dear {guest.firstName},</p>
                        <p style={{ textIndent: 30 }}>
                          {details.guestExist
                            ? "You’ve already confirmed your attendance."
                            : "Thank you so much for confirming your attendance! We’re excited to celebrate our special day with you. Your presence means the world to us, and we can’t wait to share this moment together."}
                        </p>
                        <p>Best,</p>
                        <div className="relative size-fit">
                          <span className="w-fit font-Showtime">
                            Jeffrey and Jonalyn
                          </span>
                          <div className="absolute right-1/2 top-0 flex h-full w-[175%] translate-x-1/2 justify-between opacity-35">
                            <div
                              className="basis-[35%] rotate-[140deg]"
                              style={{
                                backgroundImage: `url(${inactiveOrnament})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                scale: "2",
                              }}
                            ></div>
                            <div
                              className="basis-[35%] rotate-[40deg]"
                              style={{
                                backgroundImage: `url(${inactiveOrnament})`,
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                scale: "2",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-10 hidden h-[6%] w-[35%] max-w-[15rem]">
                        <Button
                          style={{
                            color: "black",
                            fontFamily: '"Coldiac"',
                            backgroundColor: "ivory",
                            fontWeight: "bold",
                            width: "100%",
                            height: "100%",
                            borderRadius: "25px",
                          }}
                          onClick={() => handleHomePage()}
                          className=""
                        >
                          Home
                        </Button>
                        <div
                          className="absolute left-1/2 top-1/2 -z-10 size-32 -translate-x-1/2 -translate-y-1/2 opacity-45"
                          style={{
                            backgroundImage: `url(${activeOrnament})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            scale: "1",
                          }}
                        ></div>
                      </div>
                      {/* Background Image */}
                      <div
                        className={`absolute top-1/2 -z-10 flex size-[94%] -translate-y-1/2 flex-col justify-between overflow-clip opacity-45`}
                      >
                        <div
                          className="relative -top-1/4 left-1/2 basis-[50%]"
                          style={{
                            backgroundImage: `url(${activeOrnament})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            scale: "1",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute size-[95%] rounded-xl border-4 border-solid border-ivory"></div>
              </div>
            </div>
            {/* Decline Button */}
            <div
              ref={boxRightRef}
              className={`flex ${formState === 1 && showVerifyMessage === 1 ? "basis-[0%]" : formState === 0 ? "basis-[85%]" : formState === 1 ? "basis-[20%]" : "basis-1/2"} decline relative h-full flex-col items-center justify-center gap-2`}
            >
              <div
                className={`relative flex size-[95%] flex-col items-center justify-center rounded-xl bg-barley text-ivory`}
              >
                {/* Decline message section */}
                <div
                  className={`relative z-50 ${formState === 0 ? "flex" : "hidden"} size-[95%] flex-col items-center justify-center gap-5 overflow-clip overflow-x-clip rounded-xl lg:gap-10`}
                >
                  <p
                    className={` ${formState === 0 && showDeclineMessage === 0 ? "flex" : "hidden"} h-1/4 w-[65%] flex-col justify-center rounded-xl text-base text-ivory md:text-xl lg:gap-10 lg:text-2xl`}
                  >
                    <p>Dear guest,</p>
                    <p
                      style={{
                        textIndent: 30,
                        textAlign: "center",
                        marginTop: "1rem",
                      }}
                    >
                      Are you sure you want decline this invitation?
                    </p>
                  </p>

                  <div
                    className="absolute top-1/2 -z-10 flex size-1/2 -translate-y-1/2 flex-col justify-center opacity-25"
                    style={{
                      backgroundImage: `url(${activeOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      scale: "1",
                    }}
                  ></div>

                  <div className="absolute top-1/2 -z-10 flex size-full -translate-y-1/2 flex-col justify-center opacity-75">
                    <div
                      className="relative -top-1/4 left-1/2 basis-[50%] rotate-[180deg]"
                      style={{
                        backgroundImage: `url(${activeOrnament})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        scale: "1",
                      }}
                    ></div>
                    <div
                      className="relative -bottom-1/4 right-1/2 basis-[50%] rotate-[180deg]"
                      style={{
                        backgroundImage: `url(${activeOrnament})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        scale: "1",
                      }}
                    ></div>
                  </div>
                  {/* SHow Decline Message */}
                  <div
                    ref={declineMessage}
                    className="flex h-full w-[75%] flex-col items-center justify-center gap-5 text-base md:text-xl lg:gap-10 lg:text-2xl"
                  >
                    <p style={{ textIndent: 30 }}>
                      Thank you for letting us know. While we’ll miss
                      celebrating with you, we’re grateful for your well wishes!
                    </p>
                    <p>Best,</p>
                    <div className="relative size-fit">
                      <span className="w-fit font-Showtime text-2xl lg:text-5xl">
                        Jeffrey and Jonalyn
                      </span>
                      <div className="absolute right-1/2 top-0 flex h-full w-[200%] translate-x-1/2 justify-between opacity-35">
                        <div
                          className="basis-[35%] rotate-[140deg]"
                          style={{
                            backgroundImage: `url(${inactiveOrnament})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            scale: "2",
                          }}
                        ></div>
                        <div
                          className="basis-[35%] rotate-[40deg]"
                          style={{
                            backgroundImage: `url(${inactiveOrnament})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            scale: "2",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  {/* Yes/No Button */}
                  <div
                    className={`w-full ${formState === 0 && showDeclineMessage === 0 ? "flex" : "hidden"} h-[2rem] justify-center gap-5 font-bold lg:h-[3rem]`}
                  >
                    <button
                      className="basis-[20%] rounded-lg bg-ivory text-black"
                      onClick={() => {
                        setExpand(true);
                        setShowDeclineMessage(1);
                      }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        setExpand(true);
                        setFormState(1);
                      }}
                      className="basis-[20%] rounded-lg bg-slate-500"
                    >
                      No
                    </button>
                  </div>
                </div>
                {/* Decline */}
                <div
                  ref={declineForm}
                  className={`absolute size-[95%] justify-center rounded-xl`}
                >
                  <div
                    className="hi basis-[35%] rotate-180 opacity-0"
                    style={{
                      backgroundImage: `url(${inactiveOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      scale: "1",
                    }}
                  ></div>
                  <div
                    className="basis-[35%] opacity-0"
                    style={{
                      backgroundImage: `url(${inactiveOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      scale: "1",
                    }}
                  ></div>
                </div>
              </div>
              {/* Decline Button */}
              <div
                ref={declineRef}
                onClick={() => {
                  setFormState(0);
                  setExpand(false);
                  setShowDeclineMessage(0);
                  setAcceptForm(false);
                  // setExpand(false);
                  // setInvite(0);
                  setDetails((details) => ({ ...details, submit: false }));
                  setGuest({
                    firstName: "",
                    lastName: "",
                    companion: false,
                    numberOfAttendees: 0,
                    nameOfCompanions: [],
                  });
                  setPlusOne(false);
                }}
                className={`absolute ${formState === 2 ? "basis-1/2" : formState === 0 ? "hidden basis-[85%]" : "basis-[15%]"} z-10 flex size-[95%] flex-col items-center justify-center gap-10 text-white`}
              >
                <div
                  className={`declineButton grid ${formState === 2 ? "size-[36.7%] lg:size-[51.7%]" : formState === 1 ? "size-[35%]" : "size-[50%]"} place-content-center`}
                  style={{
                    backgroundImage: `url("${declineButtonIcon}")`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
                <p
                  className={`w-full ${formState === 2 ? "block" : "hidden"} relative top-[.6rem] text-center text-2xl font-bold text-ivory`}
                >
                  Decline
                </p>
                {/* Default View */}
                <div
                  className={`absolute ${formState === 2 ? "flex" : formState === 1 ? "hidden" : "flex"} h-[50%] w-[80%] opacity-25`}
                >
                  <div
                    className="basis-1/2 rotate-180"
                    style={{
                      backgroundImage: `url(${inactiveOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      scale: "1",
                    }}
                  ></div>
                  <div
                    className="basis-1/2"
                    style={{
                      backgroundImage: `url(${inactiveOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      scale: "1",
                    }}
                  ></div>
                </div>
                {/* Inactive View */}
                <div
                  className={`absolute ${formState === 2 ? "hidden" : formState === 1 ? "flex" : "hidden"} declineButton top-[50%] size-[94%] -translate-y-[50%] flex-col justify-between overflow-clip opacity-25`}
                >
                  <div
                    className="basis-[35%]"
                    style={{
                      backgroundImage: `url(${inactiveOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "top",
                      scale: "1.1",
                    }}
                  ></div>
                  <div
                    className="basis-[35%] rotate-180"
                    style={{
                      backgroundImage: `url(${inactiveOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "top",
                      scale: "1.1",
                    }}
                  ></div>
                </div>
                {/* Active Form View */}
                <div
                  className={`absolute top-1/2 ${formState === 2 ? "hidden" : formState === 1 ? "hidden" : "flex"} size-[94%] -translate-y-1/2 flex-col justify-between overflow-clip opacity-75`}
                >
                  <div
                    className="relative -top-1/4 left-1/2 basis-[50%]"
                    style={{
                      backgroundImage: `url(${activeOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      scale: "1",
                    }}
                  ></div>
                  <div
                    className="relative right-1/2 top-1/4 basis-[50%] rotate-180"
                    style={{
                      backgroundImage: `url(${activeOrnament})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      scale: "1",
                    }}
                  ></div>
                </div>
              </div>
              <div className="absolute size-[90%] rounded-xl border-4 border-solid border-ivory"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;

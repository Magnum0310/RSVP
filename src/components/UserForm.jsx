import {
  Fragment,
  useState,
  React,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import SubmitData from "../data/SubmitData";
import Image from "../constants/Image";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

// Textfield
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// Checkbox
import FormGroup from "@mui/material/FormGroup";
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

// const Inputs = ({
//   index,
//   name,
//   placeholder,
//   type,
//   value,
//   handleChange,
//   id,
// }) => {
//   return (
//     <TextField
//       required
//       className="bg-slate-200"
//       key={index}
//       name={name}
//       id={id}
//       placeholder={placeholder}
//       type={type}
//       value={value}
//       onChange={(e) => handleChange(e)}
//     />
//   );
// };

const UserForm = ({ statePanel, setPanel, stateForm, setForm }) => {
  //===============Images===============//
  const {
    userformBorder,
    acceptButtonIcon,
    acceptOrnamentActiveButton,
    acceptOrnamentInactiveButton,
    declineButtonIcon,
    declineOrnamentActiveButton,
    declineOrnamentInactiveButton,
  } = Image;

  //===============STATES===============//

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

  //=====Verify form=====//
  const [verify, setVerify] = useState(false);

  //=====State Details=====//
  const [details, setDetails] = useState({
    home: false,
    verify: false,
    submit: false,
    load: false,
  });

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

  //=====Add Companion=====//
  const [companion, setCompanion] = useState("");

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

  //=====Handle submit form=====//
  const handleSubmit = () => {
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
      // console.log("Submit");
      setErrors((errors) => ({ ...errors, firstName: "", lastName: "" }));
      setDetails((details) => ({ ...details, submit: true }));
      return;
    }
  };

  //=====Handle verify form=====//
  const handleVerifyForm = () => {
    setDetails((details) => ({ ...details, load: true }));
    setTimeout(() => {
      setDetails((details) => ({ ...details, verify: true }));
    }, 3000);
  };

  //=====Handle home=====//
  const handleHomePage = () => {
    setInvite(2);
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
        <ListItemButton>
          <ListItemText primary={`Item ${guest.nameOfCompanions[index]}`} />
        </ListItemButton>
      </ListItem>
    );
  }

  const [expand, setExpand] = useState("");
  const state1 = Flip.getState(".accept");
  const state2 = Flip.getState(".decline");
  // const state3 = Flip.getState(".acceptForm");
  // const state4 = Flip.getState(".box");
  // const state5 = Flip.getState(".box1");

  const config = {
    ease: "power1.Out",
    duration: 0.5,
    scale: true,
    // nested: true,
    stagger: 0.5,
  };

  useLayoutEffect(() => {
    if (!state1) return;
    Flip.from(state1, config);

    if (!state2) return;
    Flip.from(state2, config);
  }, [expand]);

  const boxRef = useRef(null);
  const boxRightRef = useRef(null);
  const acceptRef = useRef(null);
  const declineRef = useRef(null);

  const [toggled, setToggled] = useState(false);
  useEffect(() => {
    //=====Initialize Ref=====//
    const boxes = boxRef.current?.querySelectorAll(".box");
    const rightBoxes = boxRightRef.current?.querySelectorAll(".boxRight");
    const acceptButton = acceptRef.current?.querySelectorAll(".acceptButton");
    const declineButton =
      declineRef.current?.querySelectorAll(".declineButton");

    console.log(declineButton);
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

      gsap.set(rightBoxes[1], {
        duration: 1,
        scale: 0,
        opacity: 0,
        ease: "power2.inOut",
      });

      //=====Accept Button =====//
      gsap.set([acceptButton[0]], {
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
        // scaleX: 1,
        // opacity: 1,
        scaleX: `${invite === 2 ? 0 : 1}`,
        opacity: `${invite === 2 ? 0 : 1}`,
        ease: "power2.inOut",
      });

      gsap.set(rightBoxes[1], {
        duration: 1,
        scale: 1,
        opacity: 1,
        ease: "power2.inOut",
      });

      //=====Accept Button=====//
      gsap.set([acceptButton[0]], {
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
        scaleX: `${invite === 2 ? 1 : 0}`,
        opacity: `${invite === 2 ? 1 : 0}`,
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
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.inOut",
      scale: true,
      nested: true,
    });
    Flip.from(declineState, {
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.inOut",
      scale: true,
      nested: true,
    });
  }, [expand]);

  console.log(expand);

  return (
    <>
      <div className="relative flex h-screen w-full flex-col justify-center gap-5 font-Coldiac">
        <div className="h-[80%] w-full">
          {/* Buttons */}
          {/* <div className="relative z-10 flex w-full justify-evenly"></div> */}
          <div className="flex size-full">
            {/* Accept invitation */}
            {/* <div
              className={`flex ${invite === 2 ? "basis-1/2" : invite === 1 ? "basis-3/4" : "basis-1/4"} relative flex-col items-center justify-center gap-2 overflow-y-scroll bg-emerald-500`}
            > */}
            {/* {invite === 1 ? ( */}
            <div
              ref={boxRef}
              className={`flex ${expand ? "basis-[85%]" : invite === 0 ? "basis-[15%]" : "basis-1/2"} accept relative h-full flex-col items-center justify-center gap-2`}
            >
              {/* {expand ? ( */}
              <div
                className={`relative ${expand ? "flex" : "flex"} h-full w-full flex-col items-center justify-center gap-2`}
              >
                <Box
                  className="box border-motif flex size-[85%] flex-col justify-center gap-5 border-4 border-solid p-5 max-lg:max-w-[90%] lg:max-w-[75%]"
                  component="form"
                  sx={{ "& .MuiTextField-root": { mb: 0, width: "100%" } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
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
                    <p className="text-base">{errors?.firstName}</p>
                  )}
                  <TextField
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
                    <p className="text-base">{errors?.lastName}</p>
                  )}
                  {/* Verify Plus One */}
                  <FormControlLabel
                    className="box w-fit"
                    control={<Checkbox onChange={() => handleCheckbox()} />}
                    label="Any companions?"
                  />
                  {/* Add full name of companion */}
                  <div
                    className={` ${plusOne ? "block" : "hidden"} justify-left flex flex-col items-center gap-3`}
                  >
                    <TextField
                      required
                      id="outlined-fullName"
                      name="fullName"
                      label="Full name"
                      type="text"
                      value={companion}
                      onChange={handleCompanion}
                    />
                    <Button
                      className="size-full"
                      disabled={companion.length < 3 ? true : false}
                      type="submit"
                      onClick={() => handleAddCompanion()}
                      variant="outlined"
                    >
                      Add
                    </Button>
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
                        // maxWidth: 560,
                        // bgcolor: "background.paper",
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
                  <Button
                    className="box"
                    variant="outlined"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </Button>
                </Box>
              </div>
              <div
                ref={acceptRef}
                className={`absolute ${invite === 2 && expand.length === 0 ? "basis-1/2" : invite === 1 && expand ? "hidden basis-[85%]" : "basis-1/4"} border-motif flex h-[85%] w-[85%] flex-col items-center justify-center gap-10 border-4 border-solid`}
              >
                <div
                  onClick={() => {
                    setExpand(true);
                    setInvite(1);
                  }}
                  className="acceptButton grid size-36 place-content-center bg-orange-500/0"
                  style={{
                    backgroundImage: `url(${acceptButtonIcon})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* <Button
                    className=""
                    variant="outlined"
                    onClick={() => {
                      setExpand(true);
                      setInvite(1);
                    }}
                  >
                    Accept
                  </Button> */}
                </div>
                <p className="text-motif w-full text-center text-2xl font-bold">
                  Accept
                </p>
              </div>
            </div>
            {/* Verfiy Details */}
            <div
              className={` ${details.submit ? "block" : "hidden"} absolute z-10 flex size-full flex-col items-center justify-center gap-5 bg-slate-300`}
            >
              <div className="flex h-[80%] w-full flex-col justify-center gap-5 px-5 max-lg:max-w-[90%] lg:max-w-[75%]">
                <p className="text-center text-2xl">Verify details</p>
                <div>
                  <label htmlFor="fullname">Full Name:</label>
                  <p id="fullname">
                    {guest.firstName} {guest.lastName}
                  </p>
                </div>
                <p>{`Total number of companion/s: ${guest.numberOfAttendees}`}</p>
                {/* <div className="flex flex-col gap-2 pl-5">
                  {guest.nameOfCompanions.map((name, index) => (
                    <p key={index}>-{name}</p>
                  ))}
                </div> */}
                {guest.nameOfCompanions.length != 0 && (
                  <Box
                    sx={{
                      width: "100%",
                      height: 100,
                      // maxWidth: 360,
                      // bgcolor: "background.paper",
                    }}
                  >
                    <FixedSizeList
                      height={200}
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
              <div className="flex gap-5">
                <SubmitData
                  guestName={guest}
                  setUpdateStatus={setUpdateStatus}
                  setDetails={setDetails}
                />
                <Button
                  onClick={() =>
                    setDetails((details) => ({ ...details, submit: false }))
                  }
                  className="w-fit bg-slate-500"
                >
                  Return
                </Button>
              </div>
              {/* </div> */}
              {/* Submitting Details */}
              <div
                className={` ${details.load ? "block" : "hidden"} absolute z-10 flex size-full flex-col items-center justify-center gap-5 bg-slate-300`}
              >
                {!details.verify && <p>Submitting Details...</p>}
                {details.verify && (
                  <div>
                    <p>Success!</p>{" "}
                    <Button
                      onClick={() => handleHomePage()}
                      className="bg-emerald-500"
                    >
                      Home
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {/* Decline invitation */}
            {/* <div
              className={`${invite === 2 ? "basis-1/2" : invite === 0 ? "basis-3/4" : "basis-1/4"} grid place-content-center bg-slate-500`}
            > */}
            {/* {invite === 0 ? ( */}
            {/* {!expand && invite === 0 ? ( */}
            <div
              ref={boxRightRef}
              // className={`decline grid ${invite === 0 ? "basis-[85%]" : "basis-1/2"} place-content-center bg-slate-500`}
              className={`decline flex ${!expand && invite === 0 ? "basis-[85%]" : invite === 1 ? "basis-[15%]" : "basis-1/2"} relative flex-col items-center justify-center bg-lime-500`}
            >
              <div className="boxRight relative flex size-[85%] flex-col justify-center gap-5 bg-red-500 p-10 max-lg:max-w-[85%] lg:max-w-[85%]">
                <p className="boxRight text-center">
                  Sorry to hear that, we wish you could be there with us
                </p>
              </div>
              <div
                ref={declineRef}
                className={`absolute ${invite === 2 && expand.length === 0 ? "basis-1/2" : invite === 0 && expand ? "hidden basis-[85%]" : "basis-1/4"} z-10 flex size-[85%] flex-col items-center justify-center gap-10 border-4 border-solid border-barley text-white`}
              >
                {/* <Button
                  variant="outlined"
                  onClick={() => {
                    setInvite(0);
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
                >
                  Decline
                </Button> */}
                <div
                  onClick={() => {
                    setExpand(false);
                    setInvite(0);
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
                  className={`declineButton size-36 text-white`}
                  style={{
                    backgroundImage: `url(${declineButtonIcon})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  {/* <Button
                    variant=""
                    onClick={() => {
                      setExpand(false);
                      setInvite(0);
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
                  >
                    Decline
                  </Button> */}
                </div>
                <p className="w-full text-center text-2xl font-bold text-barley">
                  Decline
                </p>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
      {/* <button
        className="h-full w-full bg-slate-500"
        // onClick={() => setToggled(!toggled)}
        onClick={() => setExpand(!expand)}
      >
        Click me
      </button> */}
    </>

    // <div ref={boxRef} className="z-10 flex items-center justify-center">
    //   {/* {expand ? ( */}
    //   <div className="box flex h-32 w-32 items-center justify-center bg-lime-500">
    //     {/* <div
    //       className={`box ${toggled ? "block" : "block"} h-16 w-16 bg-green-500`}
    //     ></div> */}
    //     <div className={`box flex h-16 w-16 flex-col gap-2 bg-red-500`}>
    //       <div className="box relative h-1 w-full bg-black"></div>
    //       <div className="box relative h-1 w-full bg-black"></div>
    //       <div className="box relative h-1 w-full bg-black"></div>
    //       <div className="box relative h-1 w-full bg-black"></div>
    //     </div>
    //   </div>
    //   {/* ) : (
    //     <div className="box size-16 bg-black"></div>
    //   )} */}
    // </div>
  );
};

export default UserForm;

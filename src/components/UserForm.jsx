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
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
// import { customTheme } from "../config/muiConfig";

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
import { InputLabel } from "@mui/material";

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

// const customTheme = (outerTheme) =>
//   createTheme({
//     palette: {
//       mode: outerTheme.palette.mode,
//     },
//     components: {
//       MuiTextField: {
//         styleOverrides: {
//           root: {
//             "--TextField-brandBorderColor": "#EDE8E2",
//             "--TextField-brandBorderHoverColor": "#EDE8E2",
//             "--TextField-brandBorderFocusedColor": "#EDE8E2",
//             "& label.Mui-focused": {
//               color: "var(--TextField-brandBorderFocusedColor)",
//             },
//           },
//         },
//       },
//       MuiOutlinedInput: {
//         styleOverrides: {
//           notchedOutline: {
//             borderColor: "var(--TextField-brandBorderColor)",
//           },
//           root: {
//             [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
//               borderColor: "var(--TextField-brandBorderHoverColor)",
//             },
//             [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
//               borderColor: "var(--TextField-brandBorderFocusedColor)",
//             },
//           },
//         },
//       },
//     },
//   });

// console.log(sx);
// console.log(inputSx);

const UserForm = ({ statePanel, setPanel, stateForm, setForm }) => {
  const outerTheme = useTheme();
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
          <div className="flex size-full items-center">
            {/* Accept invitation */}
            <div
              ref={boxRef}
              className={`flex ${expand && invite === 1 ? "basis-[85%]" : invite === 0 ? "basis-[20%]" : "basis-1/2"} accept relative h-full flex-col items-center justify-center gap-2`}
            >
              <Box
                className={`box ${invite === 1 ? "flex" : "hidden"} z-20 size-[85%] flex-col justify-center gap-5 border-0 border-solid border-motif p-5 max-lg:max-w-[90%] lg:max-w-[75%]`}
                component="form"
                // sx={{
                //   "& .MuiTextField-root": { mb: 0, width: "100%" },
                // }}
                noValidate
                autoComplete="off"
                sx={{
                  // Target all input fields inside the Box component
                  "& .MuiTextField-root": {
                    marginBottom: "16px", // Add space between text fields
                  },
                  "&.Mui-focused": {
                    color: "ivory", // Change text color when focused
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "ivory", // Label color when focused
                  },
                  "& .MuiInputLabel-root": {
                    color: "ivory", // Label color
                    fontFamily: "'Coldiac', sans-serif", // Font family for input text
                    fontSize: "16px", // Input font size
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "ivory", // Default border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "ivory", // Border color on hover
                  },
                  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "ivory", // Border color when focused
                  },
                  "& .MuiTypography-root": {
                    color: "ivory", // Default label color
                    fontFamily: '"Coldiac", sans-serif', // Change font family for the label
                    fontSize: "16px", // Change font size for the label
                    "&.Mui-checked": {
                      color: "purple", // Label color when checked
                    },
                  },
                }}
              >
                {/* <ThemeProvider theme={customTheme(outerTheme)}> */}
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
                  className={` ${plusOne ? "block" : "hidden"} justify-left flex w-full flex-col items-center gap-3`}
                >
                  <TextField
                    className="size-full"
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
                  sx={{
                    backgroundColor: "ivory", // Change background color
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
                  Submit
                </Button>
                {/* </ThemeProvider> */}
              </Box>

              <div
                ref={acceptRef}
                className={`absolute ${invite === 2 && expand.length === 0 ? "basis-1/2" : invite === 1 && expand ? "basis-[85%]" : "basis-[15%]"} flex size-[95%] flex-col items-center justify-center bg-motif`}
              >
                <div
                  onClick={() => {
                    setExpand(true);
                    setInvite(1);
                  }}
                  className={`relative z-10 flex size-full flex-col items-center justify-center gap-10`}
                >
                  <div
                    className={`acceptButton grid ${invite === 2 ? "size-[35%]" : invite === 0 ? "size-[65%]" : "size-[50%]"} place-content-center`}
                    style={{
                      backgroundImage: `url(${acceptButtonIcon})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <p
                    className={`w-full ${invite === 2 ? "block" : "hidden"} text-center text-2xl font-bold text-ivory`}
                  >
                    Accept
                  </p>
                </div>
                <div className="absolute size-[95%] rounded-xl border-4 border-solid border-ivory"></div>
              </div>
            </div>
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
            <div
              ref={boxRightRef}
              className={`decline flex ${!expand && invite === 0 ? "basis-[85%]" : invite === 1 ? "basis-[20%]" : "basis-1/2"} relative size-[95%] flex-col items-center justify-center bg-barley`}
            >
              <div className="boxRight z-10 flex size-[85%] flex-col justify-center gap-5 max-lg:max-w-[85%] lg:max-w-[85%]">
                <p className="boxRight grid size-full place-content-center text-center">
                  Sorry to hear that, we wish you could be there with us
                </p>
              </div>
              {/* Decline Button */}
              <div
                ref={declineRef}
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
                className={`absolute ${invite === 2 && expand.length === 0 ? "basis-1/2" : invite === 0 && expand ? "hidden basis-[85%]" : "basis-[15%]"} z-10 flex size-[95%] flex-col items-center justify-center gap-10 text-white`}
              >
                <div
                  className={`declineButton grid ${invite === 2 ? "size-[36.7%]" : invite === 1 ? "size-[65%]" : "size-[50%]"} place-content-center`}
                  style={{
                    backgroundImage: `url(${declineButtonIcon})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
                {/* <p className="w-full text-center text-2xl font-bold text-barley"> */}
                <p
                  className={`w-full ${invite === 2 ? "block" : "hidden"} text-center text-2xl font-bold text-ivory`}
                >
                  Decline
                </p>
              </div>
              <div className="absolute size-[95%] rounded-xl border-4 border-solid border-ivory bg-barley"></div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="h-full w-full bg-slate-500"
        //  onClick={() => setToggled(!toggled)}
        onClick={() => setExpand(!expand)}
      >
        Click me
      </button>
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

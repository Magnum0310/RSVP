import {
  useState,
  React,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";
import UserformContext from "@/context/UserformContext";
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
// SubmitData
import SubmitData from "@/data/SubmitData";

gsap.registerPlugin(Flip);

const AcceptInvite = () => {
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
  } = Image;
  //=====Submitting Details Animation=====//
  const submitOrnament = useRef();
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
  const successContainer = useRef();
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

  function renderRow(props) {
    const { index, style } = props;
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`${guest.nameOfCompanions[index]}`} />
        </ListItemButton>
      </ListItem>
    );
  }

  const [expand, setExpand] = useState("");
  const state1 = Flip.getState(".accept");

  const config = {
    ease: "power1.Out",
    duration: 0.5,
    scale: true,
    stagger: 0.5,
  };

  useLayoutEffect(() => {
    if (!state1) return;
    Flip.from(state1, config);
  }, [expand]);

  const boxRef = useRef(null);
  //   const boxRightRef = useRef(null);
  const acceptRef = useRef(null);
  //   const declineRef = useRef(null);

  useEffect(() => {
    //=====Initialize Ref=====//
    const boxes = boxRef.current?.querySelectorAll(".box");
    const acceptButton = acceptRef.current?.querySelectorAll(".acceptButton");
    const state = Flip.getState(boxes);
    const acceptState = Flip.getState(acceptButton);

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
      //=====Accept Button =====//
      gsap.set([acceptButton[0], acceptButton[1]], {
        duration: 1,
        scaleX: 0,
        opacity: 0,
        ease: "power2.inOut",
      });
    }
    //=====Default State=====//
    else {
      //=====Outer Userform=====//
      gsap.set(boxes[0], {
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
      //=====Animate the transition from the previous state to the current state=====//
      Flip.from(state, {
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
    }
  }, [expand]);

  return (
    <div className="relative size-full">
      {/* Accept invitation */}
      <div
        ref={boxRef}
        className={`flex ${expand && invite === 1 ? "basis-[85%]" : invite === 0 ? "basis-[20%]" : "basis-1/2"} accept relative h-full flex-col items-center justify-center gap-2`}
      >
        <Box
          className={`box ${invite === 1 ? "flex" : "hidden"} z-20 size-[85%] flex-col gap-5 ${(plusOne && errors?.firstName) || errors?.lastName ? "overflow-y-scroll" : "justify-center"} border-0 border-solid border-motif p-5 max-lg:max-w-[90%] lg:max-w-[75%]`}
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
              // backgroundColor: "rgba(237,232,226,.25)",
              borderRadius: "5px",
              paddingX: "5px",
              // opacity: "75%",
            },
            "& label.Mui-focused": {
              color: "black",
            },
            "& .MuiOutlinedInput-root": {
              fontFamily: "'Coldiac'",
              color: "black",
              fontWeight: "bold",
              backgroundColor: "ivory",
              opacity: "75%",
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
              fontSize: "16px", // Change font size for the label
              "&.Mui-checked": {
                color: "ivory", // Label color when checked
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
          {errors?.firstName && <p className="text-xs">{errors?.firstName}</p>}
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
          {errors?.lastName && <p className="text-xs">{errors?.lastName}</p>}
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
        </Box>
        {/* ADDING Background Image */}
        <div
          ref={acceptRef}
          className={`absolute ${invite === 2 && expand.length === 0 ? "basis-1/2" : invite === 1 && expand ? "basis-[85%]" : "basis-[15%]"} flex size-[95%] flex-col items-center justify-center bg-motif`}
        >
          {/* Default View */}
          <div
            className={`absolute ${invite === 2 && expand.length === 0 ? "flex" : invite === 1 && expand ? "flex" : "hidden"} h-[50%] w-[80%] opacity-25`}
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
            className={`absolute top-1/2 ${invite === 2 && expand.length === 0 ? "hidden" : invite === 1 && expand ? "hidden" : "flex"} acceptButton size-[95%] -translate-y-1/2 flex-col justify-between overflow-clip opacity-25`}
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
            className={`absolute top-1/2 ${invite === 2 && expand.length === 0 ? "hidden" : invite === 1 && expand ? "flex" : "hidden"} size-[95%] -translate-y-1/2 flex-col justify-between overflow-clip opacity-75`}
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
              setExpand(true);
              setInvite(1);
            }}
            className={`relative z-10 flex size-full flex-col items-center justify-center gap-10`}
          >
            <div
              className={`acceptButton grid ${invite === 2 ? "size-[40%] lg:size-[55%]" : invite === 0 ? "size-[35%]" : "size-[50%]"} place-content-center`}
              style={{
                backgroundImage: `url("${acceptButtonIcon}")`,
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
      {/* Verify Details Form */}
      <div
        className={` ${details.submit ? "block" : "hidden"} absolute z-[50] flex size-full flex-col items-center justify-center bg-motif text-ivory`}
      >
        {/* Verify Details  */}
        <div
          className={`z-[50] ${details.load ? "hidden" : "block"} flex size-full flex-col items-center justify-center gap-5`}
        >
          <p className="text-center text-3xl">Verify details</p>
          <div className="flex w-full basis-[55%] flex-col justify-center gap-5 px-5 text-xl max-lg:max-w-[90%] lg:max-w-[75%]">
            <div className="">
              <label className="text-base" htmlFor="fullname ">
                Full Name:
              </label>
              <p id="fullname">
                {guest.firstName} {guest.lastName}
              </p>
            </div>
            <span className="flex items-center gap-2">
              <p className="text-base">Total number of companion/s:</p>
              <p>{`${guest.numberOfAttendees}`}</p>
            </span>
            {guest.nameOfCompanions.length != 0 && (
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  "& .MuiTypography-root": {
                    color: "ivory", // Default label color
                    fontFamily: '"Coldiac", sans-serif',
                  },
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
          {/* Submit form buttons */}
          <div className="relative flex h-[3rem] w-3/4 gap-5">
            <SubmitData
              guestName={guest}
              setUpdateStatus={setUpdateStatus}
              setDetails={setDetails}
              setInvite={setInvite}
              setExpand={setExpand}
            />
            <div className="size-full basis-1/2 place-content-center rounded-full bg-returnButton text-ivory">
              <Button
                onClick={() =>
                  setDetails((details) => ({ ...details, submit: false }))
                }
                className="w-full text-ivory"
              >
                <p className="text-ivory">Return</p>
              </Button>
            </div>
          </div>
          {/* Background Image */}
          <div
            className={`absolute top-1/2 -z-10 flex size-[94%] -translate-y-1/2 flex-col justify-between overflow-clip opacity-25`}
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
        <div
          className={` ${details.load ? "block" : "hidden"} z-50 flex size-full flex-col items-center justify-center gap-5 text-4xl`}
        >
          {!details.verify && (
            <div
              // ref={submitContainer}
              className="absolute flex size-[94%] flex-col items-center justify-center bg-blue-500/0"
            >
              <p>Submitting Details...</p>
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
              className="flex size-[95%] flex-col items-center justify-center gap-16 opacity-0"
            >
              <p>Success!</p>
              <div className="flex w-[80%] flex-col gap-5 text-base">
                <p>Dear {guest.firstName},</p>
                <p style={{ textIndent: 30 }}>
                  Thank you so much for confirming your attendance! We’re
                  excited to celebrate our special day with you. Your presence
                  means the world to us, and we can’t wait to share this moment
                  together.
                </p>
                <p>Best,</p>
                <div className="relative size-fit bg-orange-500/0">
                  <span className="w-fit bg-blue-500/0 font-Showtime text-3xl">
                    Jeffrey and Jonalyn
                  </span>
                  <div className="absolute right-1/2 top-0 flex h-full w-[175%] translate-x-1/2 justify-between bg-lime-500/10 opacity-35">
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
              <div className="relative mt-10 h-[6%] w-[35%]">
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
        <div className="absolute z-20 size-[95%] border-4 border-solid border-ivory bg-orange-500/0"></div>
      </div>
    </div>
  );
};

export default AcceptInvite;

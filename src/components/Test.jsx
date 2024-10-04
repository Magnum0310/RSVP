import { useState } from "react";
import { motion } from "framer-motion";
// Textfield
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// Checkbox
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// Button
import Button from "@mui/material/Button";

const Test = () => {
  const [check, setCheck] = useState(false);

  return (
    <>
      <motion.div className="flex size-full items-center bg-slate-500">
        <div className="h-1/2 basis-1/2 bg-orange-500">Left</div>
        <div className="h-1/2 basis-1/2 bg-lime-500">Right</div>
      </motion.div>
      <button>Click</button>
    </>
  );
};

export default Test;

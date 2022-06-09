import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

export default function CustomModal(props) {
  const { openModal, parentCallBack } = props;
  const [open, setOpen] = useState(openModal);

  const handleClose = () => {
    setOpen(false);
    parentCallBack(false);
  };

  return (
    <div>
      <Dialog open={openModal} onClose={handleClose}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 450,
            alignSelf: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "60%",
              alignSelf: "center",
            }}
          >
            <p style={{ alignSelf: "center" }}>Invitation sent</p>

            <Button
              style={{ width: "90%", alignSelf: "center", marginBottom: 20 }}
              variant="outlined"
              onClick={handleClose}
            >
              OK
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

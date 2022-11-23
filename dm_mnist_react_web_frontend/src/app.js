import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import b64toBlob from "./utils/b64_to_blob";

const App = () => {
  const [labelMinist, setLabelMinist] = useState(null);
  const canvasDraw = useRef(null);
  const [img, setImg] = useState(null);

  const handleDetect = () => {
    const imgBase64 = canvasDraw.current.getDataURL(".png");
    const imgBlob = b64toBlob(imgBase64);
    console.log(imgBlob);
    setImg(() => {
      return URL.createObjectURL(imgBlob);
    });
  };
  // useEffect(() => {
  //   axios
  //     .get("http://127.0.0.1:8000/mnist/MNISTlabel", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setLabelMinist(() => {
  //         return response.data.label;
  //       });
  //     })
  //     .catch(() => {
  //       alert("cannot fetch mnist label");
  //     });
  // }, []);
  useEffect(() => {}, []);
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">
            Get classified result: {labelMinist ? labelMinist : "No result yet"}
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <CanvasDraw
              ref={canvasDraw}
              brushColor="rgb(0,0,0)"
              brushRadius={4}
              canvasWidth={800}
              canvasHeight={600}
            />
          </Box>
          <Box sx={{ marginTop: 2, display: "flex", alignItems: "center" }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                canvasDraw.current.clear();
              }}
            >
              Clear
            </Button>
            <Button variant="contained" size="large" onClick={handleDetect}>
              Detect
            </Button>
          </Box>
          <Box
            component="img"
            sx={{ width: 800, height: 600 }}
            alt="export"
            src={img}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
};
export default App;

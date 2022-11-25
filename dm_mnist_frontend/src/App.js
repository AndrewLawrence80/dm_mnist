import React, { useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import CanvasDraw from "react-canvas-draw";
import b64toBlob from "./utils/b64_to_blob";

const App = () => {
  const canvasDraw = useRef(null);
  const [canvasImage, setCanvasImage] = useState({ image: null });
  const [classifyResult, setClassifyResult] = useState({ result: null });
  const handleImageChange = () => {
    const canvasImageBlob = b64toBlob(
      canvasDraw.current.getDataURL(".png", false, "white")
    );
    const canvasImageFileName = "temp.png";
    const canvasImageFile = new File([canvasImageBlob], canvasImageFileName, {
      type: "image/png",
    });
    setCanvasImage((canvasImagePrevious) => {
      // console.log(canvasImage.image ? canvasImage.image.name : "No image yet");
      return { ...canvasImagePrevious, image: canvasImageFile };
    });
  };
  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("image", canvasImage.image, canvasImage.image.name);
    axios
      .post("http://localhost:8000/api/mnist/classify/", formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        setClassifyResult((classifyResultPrevious) => {
          return { ...classifyResultPrevious, ...response.data };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClear = () => {
    canvasDraw.current.clear();
    setClassifyResult((classifyResultPrevious) => {
      return { ...classifyResultPrevious, result: null };
    });
  };
  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h3">
          Classify Results :
          {classifyResult.result}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <CanvasDraw
            ref={canvasDraw}
            brushColor="rgb(0,0,0)"
            brushRadius={12}
            canvasWidth={400}
            canvasHeight={400}
            onChange={handleImageChange}
          />
        </Box>
        <Box sx={{ display: "flex", marginTop: 2 }}>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
          <Button
            sx={{ marginLeft: 2 }}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default App;

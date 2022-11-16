import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [labelMinist, setLabelMinist] = useState(0);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/mnist/MNISTlabel", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setLabelMinist(()=>{
          return response.data.label
        });
      })
      .catch(() => {
        alert("cannot fetch mnist label");
      });
  }, []);
  return (
    <React.Fragment>
      <h1>Get MNISTlabel {labelMinist}</h1>
    </React.Fragment>
  );
};
export default App;

import React, {Fragment} from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img src={spinner} alt="loading..." style={{width: "200px"}}></img>
    </Fragment>
  );
};

export default Spinner;

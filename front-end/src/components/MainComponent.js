import React from "react";
import { Link } from "react-router-dom";

function MainComponent() {
  return (
    <div>
      <Link to={"./products/1"}>
        <img
          src="https://peachmarket-2022-bucket.s3.ap-northeast-2.amazonaws.com/clothes1.png"
          width="300px"
          alt=""
        ></img>
      </Link>
    </div>
  );
}

export default MainComponent;

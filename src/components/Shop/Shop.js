import React from "react";
import { Fade } from "@material-ui/core";

// import Goods from "./Goods/Goods";
import Sidebar from "./Sidebar/Sidebar";

import "./Shop.scss";

export default function Shop() {
  
  return (
    <Fade in={true} timeout={300}>
      <div className="shop">
        <Sidebar />
  {/*<Goods />*/}
      </div>
    </Fade>
  );
}

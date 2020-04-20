import React, { useState } from "react";
import { Skeleton } from "@material-ui/lab";
import cx from 'classnames';

import "./Image.scss";

export default function Image(props) {

  const [loading, setLoading] = useState(true);

  const imgClasses = cx({
    show: !loading
  });

  const skeletonClasses = cx({
    skeleton: true,
    show: loading
  })

  return (
    <div className="image" style={{height: props.height + 'px'}}>
      <img className={imgClasses} src={props.src} alt="" onLoad={() => setLoading(false)}/>
      <Skeleton variant="rect" animation="wave" className={skeletonClasses}/>
    </div>
  );
}

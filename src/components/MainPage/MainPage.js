import React from "react";
import { Button, Fade } from "@material-ui/core";

import Image from "./../Image/Image";

import "./MainPage.scss";

export default function MainPage() {
  const handleOpen = () => {};

  return (
    <Fade in={true} timeout={300}>
      <div className="main-page">
        <div className="top">
          <div className="content">
            <div className="title">Lorem, ipsum.</div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              dignissimos quidem quas ratione nostrum unde eligendi suscipit
              exercitationem quae incidunt. Iste et vero veniam dolorum
              reiciendis error quis, cupiditate suscipit aspernatur placeat
              vitae ducimus sint est eaque natus voluptatibus quisquam optio,
              pariatur labore inventore itaque, atque recusandae? Culpa quaerat
              iusto explicabo adipisci eveniet ea facilis rem eum, dolor
              aspernatur eligendi debitis soluta ducimus fugiat, nisi amet
              impedit? Voluptatibus, ipsam deserunt.
            </p>
            <Button onClick={handleOpen} variant="contained" color="primary">
              Start shopping
            </Button>
          </div>
          <div className="image-container">
            <Image src="https://www.fillmurray.com/900/600" height={400} />
          </div>
        </div>
        <div className="article">
          <Image src="https://www.fillmurray.com/640/360" height={200}/>
          <div className="title">Lorem, ipsum dolor.</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            similique ducimus aliquam rem odit, quibusdam maiores earum
            reiciendis molestias dignissimos. Quas praesentium fugit laborum et
            veniam, fuga temporibus quibusdam dolores?
          </p>
        </div>
        <div className="article">
          <Image src="https://www.fillmurray.com/640/360" height={200}/>
          <div className="title">Lorem, ipsum dolor.</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            similique ducimus aliquam rem odit, quibusdam maiores earum
            reiciendis molestias dignissimos. Quas praesentium fugit laborum et
            veniam, fuga temporibus quibusdam dolores?
          </p>
        </div>
        <div className="article">
          <Image src="https://www.fillmurray.com/640/360" height={200}/>
          <div className="title">Lorem, ipsum dolor.</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            similique ducimus aliquam rem odit, quibusdam maiores earum
            reiciendis molestias dignissimos. Quas praesentium fugit laborum et
            veniam, fuga temporibus quibusdam dolores?
          </p>
        </div>
        <div className="article">
          <Image src="https://www.fillmurray.com/640/360" height={200}/>
          <div className="title">Lorem, ipsum dolor.</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            similique ducimus aliquam rem odit, quibusdam maiores earum
            reiciendis molestias dignissimos. Quas praesentium fugit laborum et
            veniam, fuga temporibus quibusdam dolores?
          </p>
        </div>
        <div className="article">
          <Image src="https://www.fillmurray.com/640/360" height={200}/>
          <div className="title">Lorem, ipsum dolor.</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            similique ducimus aliquam rem odit, quibusdam maiores earum
            reiciendis molestias dignissimos. Quas praesentium fugit laborum et
            veniam, fuga temporibus quibusdam dolores?
          </p>
        </div>
        <div className="article">
          <Image src="https://www.fillmurray.com/640/360" height={200} />
          <div className="title">Lorem, ipsum dolor.</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            similique ducimus aliquam rem odit, quibusdam maiores earum
            reiciendis molestias dignissimos. Quas praesentium fugit laborum et
            veniam, fuga temporibus quibusdam dolores?
          </p>
        </div>
      </div>
    </Fade>
  );
}

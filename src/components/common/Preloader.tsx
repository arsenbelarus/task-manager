import React from "react";

type PreloaderType = {
  size?: string,
  color: string,
}


const Preloader = (props: PreloaderType) => {
  return (
    <div className={`preloader-wrapper ${props.size} active`}>
      <div className={`spinner-layer spinner-${props.color}-only`}>
        <div className={"circle-clipper left"}>
          <div className={"circle"}/>
        </div>
        <div className={"gap-patch"}>
          <div className={"circle"}/>
        </div>
        <div className={"circle-clipper right"}>
          <div className={"circle"}/>
        </div>
      </div>
    </div>
  )
}

export default Preloader


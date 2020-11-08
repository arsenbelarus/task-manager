import React from "react";

const ProjectHeader = () => {
  return(
    <div className="row projects-header">
      <div className="col s4 center projects-header-item">
        In progress
      </div>
      <div className="col s4 center projects-header-item">
        Under testing
      </div>
      <div className="col s4 center projects-header-item">
        Waiting to be approved
      </div>
    </div>
  )
}

export default ProjectHeader
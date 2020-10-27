import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id }: {id: string} = useParams();

  return (
    <div className={'container section projectDetails'}>
      <div className={'card z-depth-0'}>
        <div className={'card-content'}>
          <span className={'card-title'}> Title of page {id}</span>
          <p>
            Some dummy text in this card. Some dummy text in this card. Some dummy text in this card.
            Some dummy text in this card. Some dummy text in this card. Some dummy text in this card.
            Some dummy text in this card. Some dummy text in this card. Some dummy text in this card.
          </p>
        </div>
        <div className={'card-action grey grey-text lighten-4'}>
          <div>
            Posted by
          </div>
          <div>
            Date will be here
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
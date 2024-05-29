import React from "react";
import moment from "moment";
import style from "./movieCard.module.css";

const MovieCard = (props) => {
  return (
    <div className={`${style.single_movie} shadow`}>
      <div className="movie-single-img">
        <img src={props.poster} alt="" className="img-fluid" />
        <div className={style.text_area}>
          <h3>{props.title}</h3>
          <ul>
            <li>
              <span>Release Date : </span>
              {`${moment(props.release).format("YYYY")}`}
            </li>
            <li>
              <span>Genre : </span>
              Action, Drama
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

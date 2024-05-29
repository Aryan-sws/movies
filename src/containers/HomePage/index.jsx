import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import style from "./homePage.module.css";
import MovieCard from "../../components/MovieCard";
import * as assets from "../../assets/index";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL =
    "https://api.themoviedb.org/3/search/movie?api_key=99ac92f20c641e6750f5c80123a59945";

  const getMovie = async (title = "", page = 1) => {
    const response = await fetch(`${API_URL}&query=${title}&page=${page}`);
    const data = await response.json();
    setMovieList(data.results || []);
    setCurrentPage(data.page);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    getMovie("superman", currentPage);
  }, [searchTerm, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log(movieList);

  return (
    <>
      <Container>
        <div className="d-flex justify-content-center mt-5 mb-5">
          <h1>Movies </h1>
        </div>
        <div className={style.search}>
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={assets.search}
            alt="search"
            onClick={() => getMovie(searchTerm)}
          />
        </div>
        <Row>
          {movieList.length > 0 ? (
            movieList.map((val, index) => (
              <Col xs={12} md={4} key={index}>
                <MovieCard
                  poster={
                    val.poster_path
                      ? `https://image.tmdb.org/t/p/w500${val.poster_path}`
                      : "https://via.placeholder.com/400"
                  }
                  title={val.title}
                  release={val.release_date}
                />
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <p>Data Not Found</p>
            </Col>
          )}
        </Row>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4 mb-5">
            <Button
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="mx-3">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="secondary"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default HomePage;

import React, { useEffect, useState, useMemo, useCallback } from "react"; // Import useMemo
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const AllCVsDisplay = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  // Fetch CVs once when component mounts
  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const response = await fetch("http://localhost:5000/cvs");
        if (!response.ok) {
          throw new Error("Failed to fetch CVs");
        }
        const data = await response.json();
        setCvs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCvs();
  }, []);

  // memoized filtered CVs result
  const filteredCvs = useMemo(() => {
    let filtered = cvs;
    const searchQuery = searchParams.get("search") || "";

    if (searchQuery) {
      filtered = filtered.filter((cv) =>
        cv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cv.surname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [cvs, searchParams]);

  //preventing creation of new function instances on rerenders
  const handleSearch = useCallback((e) => {
    const searchValue = e.target.value;
    setSearchParams({ search: searchValue });
  }, [setSearchParams]);
  
  const handleDelete = useCallback(async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this CV?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/cvs/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete CV");
        }
        setCvs((prevCvs) => prevCvs.filter((cv) => cv.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  }, []);
  

  const clearFields = () => {
    setSearchParams({});
  };

  if (loading) {
    return <p>Loading CVs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="searchBars">
        <input
          placeholder="Search CVs..."
          className="searchBar"
          onChange={handleSearch}
          value={searchParams.get("search") || ""}
        />
        <button className="clear-btn" onClick={clearFields}>Clear Filters</button>
      </div>
      <div className="cardContainer">
        {filteredCvs.map((cv) => (
          <div key={cv.id} className="card">
            <h3>
              {cv.name} {cv.surname}
            </h3>
            <p>
              <strong>Email:</strong> {cv.email}
            </p>
            <p>
              <strong>Phone:</strong> {cv.phone}
            </p>
            <p>
              <strong>Nationality:</strong> {cv.nationality}
            </p>
            <p>
              <strong>Date of Birth:</strong> {cv.dob}
            </p>
            <p>
              <strong>LinkedIn:</strong> {cv.linkedin}
            </p>
            <p>
              <strong>GitHub:</strong> {cv.github}
            </p>
            <div className="card-buttons">
              <button
                className="view-btn"
                onClick={() => {
                  navigate(`/card/${cv.id}`, { state: { cv } });
                }}
              >
                View
              </button>
              <button className="delete-btn" onClick={() => handleDelete(cv.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllCVsDisplay;

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const AllCVsDisplay = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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

  // Log when filteredCvs is computed
  const filteredCvs = useMemo(() => {
    console.log("Computing filtered CVs");
    let filtered = cvs;
    const searchQuery = searchParams.get("search") || "";
    const sortQuery = searchParams.get("sort") || "date_new";

    if (searchQuery) {
      filtered = filtered.filter(
        (cv) =>
          cv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cv.surname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortQuery === "date_new") {
      filtered = [...filtered].sort((a, b) => new Date(b.dateCreate) - new Date(a.dateCreate));
    } else if (sortQuery === "date_old") {
      filtered = [...filtered].sort((a, b) => new Date(a.dateCreate) - new Date(b.dateCreate));
    }
    console.log("Filtered CVs:", filtered);
    return filtered;
  }, [cvs, searchParams]);

  // Log when the search input changes
  const handleSearch = useCallback(
    (e) => {
      const searchValue = e.target.value;
      const sortValue = searchParams.get("sort") || "date_new";
      setSearchParams({ search: searchValue, sort: sortValue });
      console.log("Search input changed:", searchValue);
    },
    [setSearchParams]
  );

  // Log when the sort selection changes
  const handleSortChange = useCallback(
    (e) => {
      const sortValue = e.target.value;
      const searchValue = searchParams.get("search") || "";
      setSearchParams({ search: searchValue, sort: sortValue });
      console.log("Sort option changed:", sortValue);
    },
    [setSearchParams, searchParams]
  );

  // Log when a CV is deleted
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
        setCvs((prevCvs) => {
          const newCvs = prevCvs.filter((cv) => cv.id !== id);
          console.log("CV deleted:", id);
          return newCvs;
        });
      } catch (err) {
        setError(err.message);
      }
    }
  }, []);

  const clearFields = useCallback(() => {
    setSearchParams({});
    console.log("Filters cleared");
  }, [setSearchParams]);
  

  if (loading) {
    console.log("Loading CVs...");
    return <p>Loading CVs...</p>;
  }

  if (error) {
    console.error("Error loading CVs:", error);
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
        <select onChange={handleSortChange} value={searchParams.get("sort") || "date_new"}>
          <option value="date_new">Date Created (Newest First)</option>
          <option value="date_old">Date Created (Oldest First)</option>
        </select>
        <button className="clear-btn" onClick={clearFields}>
          Clear Filters
        </button>
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
              <strong>Date Created:</strong> {new Date(cv.dateCreate).toLocaleDateString()}
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
              <button
                className="delete-btn"
                onClick={() => handleDelete(cv.id)}
              >
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

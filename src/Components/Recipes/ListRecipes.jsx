import React, { useState, useEffect } from "react";
import axios from "axios";

function ListRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await axios.get("/api", {
          params: {
            page: page,
            pageSize: pageSize,
          },
        });
        console.log(response.data.recipes);
        setRecipes(response.data.recipes);
      } catch (err) {
        console.error(err);
      }
    }
    fetchRecipes();
  }, [page, pageSize]);

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePreviousPage() {
    setPage(page - 1);
  }

  return (
    <div>
      <ul>
        {recipes.map((recipe) => (
          <>
            <li key={recipe.id}>{recipe.title}</li>
            <img src={recipe.image} alt={recipe.sourceUrl} />
          </>
        ))}
      </ul>
      <button onClick={handlePreviousPage} disabled={page === 1}>
        Previous
      </button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}

export default ListRecipes;

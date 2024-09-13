import { useEffect, useState } from "react";
import "./styles.css";

import { fetchProjects, type ProjectType, type Data } from "./api";

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Data>();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    let showing = true;
    setFetching(true);
    fetchProjects(page)
      .then((res) => {
        showing && setData(res);
      })
      .finally(() => setFetching(false));
    return () => {
      showing = false;
    };
  }, [page]);
  return (
    <div>
      {data && data.projects.map(({ name, id }) => <div key={id}>{name}</div>)}
      <div className="pager-row">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (page > 1) {
              setPage((prev) => prev - 1);
            }
          }}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <div>{page}</div>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (data && page < data.totalPages) {
              setPage((prev) => prev + 1);
            }
          }}
          disabled={!data || page === data.totalPages}
        >
          Next Page
        </button>
        {fetching ? "Loading" : "All Done"}
      </div>
    </div>
  );
}

export default App;

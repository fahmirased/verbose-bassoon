import React from "react";

const Filter = ({search, setSearch}) => {
    return (
        <div>
        filter shown with <input
        value = {search}
        onChange={(event) => setSearch(event.target.value)}
        />
      </div>
    )
}

export default Filter
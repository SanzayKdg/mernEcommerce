import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = () => {
  // const navigate = useNavigate();
  const history = useHistory();

  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push(`/products`);
      
    }
  };
  return (
    <Fragment>
          <MetaData title="Search Products -- Ecommerce"/>
        
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </Fragment>
  );
};

export default Search;

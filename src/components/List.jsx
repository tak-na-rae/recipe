import React from 'react';

import { Link } from 'react-router-dom';

const List = ( {data} ) => {
  return (
    <>
      <ul className="recipe-list">
        {data.map( ({RCP_SEQ,ATT_FILE_NO_MK,RCP_PAT2,RCP_NM }) => (
          <li key={RCP_SEQ}>
            <div className="cont">
              <div className="img-scale">
                <Link to={`/recipe/${RCP_SEQ}`}><img src={ATT_FILE_NO_MK} alt={RCP_NM}/></Link>
                {/* <Link to={`/recipe/${RCP_SEQ}`}><img src={ATT_FILE_NO_MK} alt={RCP_NM}/></Link> */}
                {/* <img src={ATT_FILE_NO_MK} alt={RCP_NM}/> */}
              </div>
              <span className="badge">{RCP_PAT2}</span>
              <p className="name">{RCP_NM}</p>
            </div>
          </li>
        ) )}
      </ul>
    </>
  );
};

export default List;
import React, { useContext } from 'react';

import { useParams } from 'react-router-dom';
import { DataContext } from '../App';
import List from '../components/List';

const Category = () => {
  const { data,loading } = useContext(DataContext);
  const { category } = useParams();
  
  if(loading) <div className="loading"><div className="spinner"></div><h2>데이터 로딩중!</h2></div>;
  const filterData = data.filter((item) => item.RCP_PAT2 === category);

  return (
    <>
    <div className="p-filter">
      <div className="layout-fix">
        <h2 className="heading-tit">{category}</h2>
        <List data={filterData}/>
      </div>
    </div>
      
    </>
  );
};

export default Category;
import React, { useMemo } from 'react';

import { useContext } from "react";
import { DataContext } from '../App';

import { NavLink } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const Nav = () => {
  const {data,checkCate} = useContext(DataContext);

    //+++상세페이지 카테고리 매치
    const location = useLocation();
    const isRecipePage = location.pathname.startsWith("/recipe");
    console.log("cate==",checkCate);

  // if(loading) <h2 className="loading">데이터 로딩중..</h2>;

    // 데이터가 아직 로딩 중일 경우 혹은 데이터가 없으면 처리하지 않도록
  // if (loading || !Array.isArray(data) || data.length === 0) {
  //   return <h2 className="loading">데이터 로딩중..</h2>;
  // }

  ////중복된 제목은 제거하고 고유한 값을 set 객체로 생성
  // const categories = [ ...new Set(data.map((el)=> el.RCP_PAT2)) ];
  const categories = useMemo(() => { // data가 변경될 때만 계산
    return [...new Set(data.map((el) => el.RCP_PAT2))];
  }, [data]);

  console.log("카데고리순서확인", categories)
  const activeStyle = {
    color: "#ff8800",
  }

 
  return (
    <>
      <div className="nav">
        <div className="layout-fix">
          <ul className="gnb">
            <li>
            <NavLink style={ ({isActive}) => (isActive ? activeStyle : null) }
                to={`/`}>전체</NavLink>
            </li>

            {/* <NavLink style={ ({isActive}) => (isActive ? activeStyle : null) } */}
            {categories.map((cate, idx) => (
              <li key={idx}>
                <NavLink style={ ({isActive}) => (isActive ? activeStyle : null) || (isRecipePage && checkCate == cate ? activeStyle : null) }
                  to={`/${cate}`}>{cate}</NavLink>
              </li>
            ))}

          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
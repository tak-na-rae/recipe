import React, { useEffect } from 'react';

import { useState, useContext } from 'react';
import { DataContext } from '../App';
import { Link } from "react-router-dom";

import { Autoplay,Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Home = () => {
  const {data,loading} = useContext(DataContext);

   // 데이터가 준비되었고 로딩이 끝났을 때만 Swiper 렌더링
  const [swiperReady,setSwiperReady] = useState(false);
  useEffect(() => {
    if (data && data.length > 0) {
      setSwiperReady(true);
    }
  }, [data]);
  if (!swiperReady || loading) return <div className="loading"><div className="spinner"></div><h2>데이터 로딩중!</h2></div>;


  return (
    <>
      <div className="p-main">
        <div className="recommend-cont">
          <div className="layout-fix">
          <h2 className="heading-tit">랜덤 레시피 </h2>
          <Swiper className="swiper-recommend"
              modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
              loop={true}
              slidesPerView={6}
              spaceBetween={20}
              autoplay={{ delay: 2000, disableOnInteraction:false }}
              pagination={{ type:'fraction', clickable: true }}
              navigation={{ prevEl:'.swiper-prev', nextEl:'.swiper-next' }}
              grabCursor={true}>
              {data.sort(() => Math.random() - 0.5)
              .slice(0,10).map(item => (
                <SwiperSlide key={item.RCP_SEQ}>
                  <Link to={`/recipe/${item.RCP_SEQ}`}><img src={item.ATT_FILE_NO_MK} alt={item.RCP_NM}/></Link>
                  <p className="name">{item.RCP_NM}</p>
                </SwiperSlide>
              ) )}
            </Swiper>
            <div className="swiper-pager">
              <span className="swiper-prev">left</span>
              <span className="swiper-next">right</span>
            </div>
          </div>
        </div> {/* recommend-cont */}

        <div className="recipe-cont">
          <div className="layout-fix">
            { loading ? (
              <div className="loading"><div className="spinner"></div><h2>데이터 로딩중!</h2></div>
            ) : (
              <>
                <h2 className="heading-tit">조리식품의 레시피</h2>
                <ul className="recipe-list">
                  {data.map(el=>(
                    <li key={el.RCP_SEQ}>
                      <div className="cont">
                        <div className="img-scale">
                          <Link to={`/recipe/${el.RCP_SEQ}`}><img src={el.ATT_FILE_NO_MK} alt={el.RCP_NM}/></Link>
                        </div>
                        <span className="badge">{el.RCP_PAT2}</span>
                        <p className="name">{el.RCP_NM}</p>
                        {/* <p className="calorie">{el.INFO_ENG}kcal</p> */}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) }
          </div>
        </div> {/* recipe-cont */}
      
      </div> {/* p-main */}
    </>
  );
};

export default Home;
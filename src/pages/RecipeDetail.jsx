

import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { DataContext } from '../App';


const RecipeDetail = () => {
  const APIKEY = process.env.REACT_APP_API_KEY;
  
  const {id} = useParams();
  const [menu,setMenu] = useState({}); //({})([]) **중요
  const [loading,setLoading] = useState(true);

  //+++상세페이지 카테고리 매치
  const { setCheckCate } = useContext(DataContext);
  
  useEffect(()=>{
    axios.get(`https://openapi.foodsafetykorea.go.kr/api/${APIKEY}/COOKRCP01/json/1/100`)
    .then((res)=>{
        const foundMenu = res.data.COOKRCP01.row.find(el => String(el.RCP_SEQ) === String(id));
        console.log("foundMenu==",foundMenu);
        setCheckCate(foundMenu.RCP_PAT2); //+++RCP_PAT2 값 전달
        setMenu(foundMenu || alert("error!"));
        setLoading(false);
      })
      .catch((err)=>{ console.log(err); })
    },[id]);



    const [clickImg, setClickImg] = useState("");
    useEffect(()=>{
      setClickImg(menu.ATT_FILE_NO_MK);
    },[menu])
    const handleImg = (url)=>{
      setClickImg(url);
    }

  return (
    <>
      <div className="p-detail">
        <div className="layout-fix">
          { loading ? (<div className="loading"><div className="spinner"></div><h2>데이터 로딩중!</h2></div>) : (
            <>
              <div className="info">
                <div className="thumb-group">
                  {/* <img src={menu.ATT_FILE_NO_MK} alt={menu.RCP_NM}/> */}
                  <img src={clickImg} alt={menu.RCP_NM}/>
                  <ul className="thumb-list">
                    {Object.keys(menu)
                      .filter((key)=> key.startsWith("MANUAL_IMG") && menu[key])
                      .sort((a, b) => parseInt(a.slice(-2)) - parseInt(b.slice(-2))) // (-2는 문자열에서 마지막 두 자리를 기준으로 정렬)
                      .map((key,idx)=> ( <li key={idx}><img src={menu[key]} alt={menu.RCP_NM} onClick={()=>handleImg(menu[key])}/></li> ))
                    }
                    <li><img src={menu.ATT_FILE_NO_MK} alt={menu.RCP_NM} onClick={()=> handleImg(menu.ATT_FILE_NO_MK) }/></li>
                  </ul>
                  <span className="help">* 대표사진 외 이미지들은 선명하지 않을 수 있으니 양해 부탁드립니다.</span>
                </div>
                <div className="txt">
                  <span className="badge">{menu.RCP_PAT2}</span>
                  <h2 className="heading-tit">{menu.RCP_NM}</h2>
                  <p className="tip">{menu.RCP_NA_TIP}</p>

                  <ul className="option-list">
                    {menu.INFO_WGT && <li>중량(1인분) <b>{menu.INFO_WGT}</b></li>}
                    {menu.INFO_ENG && <li>열량 <b>{menu.INFO_ENG}</b></li>}
                    {menu.INFO_CAR && <li>탄수화물 <b>{menu.INFO_CAR}</b></li>}
                    {menu.INFO_PRO && <li>단백질 <b>{menu.INFO_PRO}</b></li>}
                    {menu.INFO_FAT && <li>지방 <b>{menu.INFO_FAT}</b></li>}
                    {menu.INFO_NA && <li>나트륨 <b>{menu.INFO_NA}</b></li>}
                  </ul>
                  <div className="parts">{menu.RCP_PARTS_DTLS ? menu.RCP_PARTS_DTLS.replace(/●/g, "") : null}</div>
                  <ul className="idx-list">
                    {Object.keys(menu)
                      .filter((key)=> key.startsWith("MANUAL") && !key.startsWith("MANUAL_IMG") && menu[key])
                      .sort((a, b) => parseInt(a.slice(-2)) - parseInt(b.slice(-2)))
                      .map((key,idx)=> ( <li key={idx}>{menu[key]}</li> ))
                    }
                  </ul>
                </div>
              </div>
            </>
          ) }
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
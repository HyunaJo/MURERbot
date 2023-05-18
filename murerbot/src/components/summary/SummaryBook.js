import "../../css/summary/summaryBook.css";
import { VictoryPie } from 'victory';
import BarChart from "./BarChart";
import { DotSpinner } from '@uiball/loaders'
import {MdOutlineDisabledByDefault} from "react-icons/md";
import {IoIosArrowDown,IoIosArrowUp} from "react-icons/io"
import React,{ useState } from "react";
import {FaUser} from "react-icons/fa";

const infoNonDefine = "요약본이 존재하지 않습니다."
const SummaryBook = React.forwardRef(({summaryDict},scrollbarRef) => {
    const [inforMoreBtn,setInforMoreBtn]=useState(false);
    if(summaryDict){
        const data = [
            { x: 1, y: summaryDict.fullPositivePercent?parseFloat(summaryDict.fullPositivePercent):0, label: `긍정\n${parseFloat(summaryDict.fullPositivePercent)}%`},
            { x: 2, y: summaryDict.fullNegativePercent?parseFloat(summaryDict.fullNegativePercent):0, label: `부정\n${parseFloat(summaryDict.fullNegativePercent)}%`}
        ]

        const barData = [
            { name: '부정', data: [parseFloat(summaryDict.designNegativePercent),parseFloat(summaryDict.weightNegativePercent), parseFloat(summaryDict.performanceNegativePercent),parseFloat(summaryDict.noiseNegativePercent),  parseFloat(summaryDict.sizeNegativePercent),parseFloat(summaryDict.satisficationNegativePercent)]},
            { name: '긍정', data: [parseFloat(summaryDict.designPositivePercent),parseFloat(summaryDict.weightPositivePercent), parseFloat(summaryDict.performancePositivePercent),parseFloat(summaryDict.noisePositivePercent), parseFloat(summaryDict.sizePositivePercent),parseFloat(summaryDict.satisficationPositivePercent)]}
        ]
        const informationMore = (e)=>{
            e.preventDefault();
            if(scrollbarRef) scrollbarRef.current.scrollTop();
            inforMoreBtn?setInforMoreBtn(false):setInforMoreBtn(true);
        }

        return (
        <>

            <div className="summaryBook_div">
                <header className={summaryDict.productName===infoNonDefine?"product_info_nonDefine":""}>
                    <h1>{summaryDict.productName?summaryDict.productName:null}</h1>
                    {summaryDict.productName===infoNonDefine?<MdOutlineDisabledByDefault size={120} className="product_info_nonDefine_icon"/>:null}
                </header>
                
                {summaryDict.detailInfo?
                <div className="product_info">
                    <h2 className="summary_h2">1. 상품 상세 정보</h2>
                    <div className="summary_division_line"></div>
                    <div className="info_div">
                        <div className="info_box">
                        {summaryDict.detailInfo.length!==0?
                        <div className="infos_div">
                            <div className="info1">
                                    {inforMoreBtn?summaryDict.detailInfo.map((value,idx)=>idx<summaryDict.detailInfo.length/2?<p key={idx}>{value}</p>:null)
                                    :summaryDict.detailInfo.map((value,idx)=>idx<summaryDict.detailInfo.length/2&&idx<5?<p key={idx}>{value}</p>:null)}
                                </div>
                                <div className="info2">
                                    {inforMoreBtn?summaryDict.detailInfo.map((value,idx)=>idx>=summaryDict.detailInfo.length/2?<p key={idx}>{value}</p>:null)
                                    :summaryDict.detailInfo.map((value,idx)=>idx>=summaryDict.detailInfo.length/2&&idx<(summaryDict.detailInfo.length/2)+5?<p key={idx}>{value}</p>:null)}
                                </div>
                            </div>
                            :<div className="not_infos">상세 정보가 존재하지 않습니다.</div>}
                            {summaryDict.detailInfo.length/2>=5?<div className="plus_info">
                                <button onClick={informationMore}>{inforMoreBtn?"상세 정보 접기":"상세 정보 펼치기"} 
                                {inforMoreBtn?<IoIosArrowUp className="arrow_down" size={18} color={"#b1b1b1"} />:<IoIosArrowDown className="arrow_down" size={18} color={"#b1b1b1"} />}
                                </button>
                            </div>:null}
                        </div>
                        {summaryDict.imageURL?<img className="product_img" alt="mosue" src={summaryDict.imageURL} />:null}   
                    </div>
                </div>:null}
                {summaryDict.fullPositiveSummary?
                <div className="total_review_summarization">
                    <h2 className="summary_h2">2. 전체 리뷰 요약</h2>
                    <div className="summary_division_line"></div>
                    <p className="review_source">※ 해당 상품 리뷰의 출처는 네이버 쇼핑입니다.</p>
                    <div className="total_chart">
                        <svg viewBox="0 0 1000 220">
                        <VictoryPie
                            labelRadius={120}
                            standalone={false}
                            name="pie"
                            width={1000}
                            height={420}
                            style={{ labels: { padding: 10, fontSize: 17, fill: "#ffffff", fontWeight:"bold"}}}
                            startAngle={90}
                            endAngle={-90}
                            colorScale={["#6BA694", "#E3465F" ]}
                            data={data}
                            animate={{
                                duration: 2000
                            }}
                        />
                        </svg>

                    </div>
                
                    <div className="review_positive_summary">
                        <p><strong>{`긍정`}</strong></p> 
                        <div className="user_review">
                            <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                            <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.fullPositiveSummary[0]}}/></div>   
                        </div>
                        <div className="user_review">
                            <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                            <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.fullPositiveSummary[1]}}/></div>   
                        </div>
                    </div>
                    <div className="review_negative_summary">
                        <p><strong>{`부정`}</strong></p>
                        <div className="user_review">
                            <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                            <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.fullNegativeSummary[0]}}/></div>
                        </div>
                        <div className="user_review">
                            <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                            <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.fullNegativeSummary[1]}}/></div>
                        </div>
                    </div>
                    
                </div>:null}
                {summaryDict.designPositivePercent?
                <div className="review_property_summarization">
                    <h2 className="summary_h2">3. 속성별 리뷰 요약</h2>
                    <div className="summary_division_line"></div>
                    <p className="review_source">※ 해당 상품 리뷰의 출처는 네이버 쇼핑입니다.</p>
                    <div className="property_bar">
                        <BarChart barData={barData} />
                    </div>
                    <div className="property_list">
                        <ul>
                            {summaryDict.designPositivePercent||summaryDict.designNegativePercent?<li>
                                <h3 className="attribute_h3">디자인</h3>
                                {summaryDict.designPositiveSummary[0]?
                                <><p className="positive_p"><strong>{`긍정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.designPositiveSummary[0]}}/></div>
                                </div>
                                </>:null}
                                {summaryDict.designPositiveSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.designPositiveSummary[1]}}/></div>
                                </div>
                                </>:null}

                                {summaryDict.designNegativeSummary[0]?
                                <><p><strong>{`부정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.designNegativeSummary[0]}}/></div>
                                </div>
                                </>:null}
                                {summaryDict.designNegativeSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.designNegativeSummary[1]}}/></div>
                                </div>
                                </>:null}
                            </li>:null}
                            {summaryDict.weightPositivePercent||summaryDict.weightNegativePercent?<li>
                                <h3 className="attribute_h3">무게</h3>
                                {summaryDict.weightPositiveSummary[0]?
                                <><p className="positive_p"><strong>{`긍정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.weightPositiveSummary[0]}}/></div>
                                </div>    
                                </>:null}
                                {summaryDict.weightPositiveSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.weightPositiveSummary[1]}}/></div>
                                </div>    
                                </>:null}
                                {summaryDict.weightNegativeSummary[0]?
                                <><p><strong>{`부정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.weightNegativeSummary[0]}}/></div>
                                </div>    
                                </>:null}
                                {summaryDict.weightNegativeSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.weightNegativeSummary[1]}}/></div>
                                </div>    
                                </>:null}
                            </li>:null}
                            {summaryDict.performancePositivePercent||summaryDict.performanceNegativePercent?<li>
                                <h3 className="attribute_h3">성능</h3>
                                {summaryDict.performancePositiveSummary[0]?
                                <>
                                <p className="positive_p"><strong>{`긍정`}</strong></p>
                                    <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.performancePositiveSummary[0]}}/></div>
                                </div>
                                </>:null}
                                {summaryDict.performancePositiveSummary[1]?
                                <>
                                    <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.performancePositiveSummary[1]}}/></div>
                                </div>
                                </>:null}

                                {summaryDict.performanceNegativeSummary[0]?
                                <><p><strong>{`부정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.performanceNegativeSummary[0]}}/></div>
                                </div>    
                                </>:null}
                                {summaryDict.performanceNegativeSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.performanceNegativeSummary[1]}}/></div>
                                </div>    
                                </>:null}
                            </li>:null}
                            {summaryDict.noisePositivePercent||summaryDict.noiseNegativePercent?<li>
                                <h3 className="attribute_h3">소음</h3>
                                {summaryDict.noisePositiveSummary[0]?
                                <>
                                <p className="positive_p"><strong>{`긍정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.noisePositiveSummary[0]}}/></div>
                                </div>
                                </>:null}
                                {summaryDict.noisePositiveSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.noisePositiveSummary[1]}}/></div>
                                </div>
                                </>:null}

                                {summaryDict.noiseNegativeSummary[0]?
                                <><p><strong>{`부정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.noiseNegativeSummary[0]}}/></div>
                                </div>    
                                </>:null}
                                {summaryDict.noiseNegativeSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.noiseNegativeSummary[1]}}/></div>
                                </div>    
                                </>:null}
                            </li>:null}
                            {summaryDict.sizePositivePercent||summaryDict.sizeNegativePercent?<li>
                                <h3 className="attribute_h3">크기</h3>
                                {summaryDict.sizePositiveSummary[0]?
                                <><p className="positive_p"><strong>{`긍정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.sizePositiveSummary[0]}}/></div>
                                </div>    
                                </>:null}
                                
                                {summaryDict.sizePositiveSummary[1]?
                                <>
                                    <div className="user_review">
                                        <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                        <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.sizePositiveSummary[1]}}/></div>
                                    </div>    
                                </>:null}
                                
                                {summaryDict.sizeNegativeSummary[0]?
                                <>
                                <p><strong>{`부정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.sizeNegativeSummary[0]}}/></div>
                                </div>    
                                </>:null}
                                {summaryDict.sizeNegativeSummary[1]?
                                <>
                                    <div className="user_review">
                                        <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                        <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.sizeNegativeSummary[1]}}/></div>
                                    </div>    
                                </>:null}
                                
                            </li>:null}
                            {summaryDict.satisficationPositivePercent||summaryDict.satisficationNegativePercent?<li>
                                <h3 className="attribute_h3">만족도</h3>
                                {summaryDict.designPositiveSummary[0]?
                                <><p className="positive_p"><strong>{`긍정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.designPositiveSummary[0]}}/></div>
                                </div>
                                </>:null}
                                {summaryDict.designPositiveSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.designPositiveSummary[1]}}/></div>
                                </div>
                                </>:null}
                    
                                {summaryDict.designNegativeSummary[0]?
                                <><p><strong>{`부정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.designNegativeSummary[0]}}/></div>
                                </div>
                                </>:null}
                                {summaryDict.designNegativeSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p dangerouslySetInnerHTML={{__html:summaryDict.designNegativeSummary[1]}}/></div>
                                </div>
                                </>:null}
                            </li>:null}
                            {summaryDict.weightPositivePercent||summaryDict.weightNegativePercent?<li>
                                <h3 className="attribute_h3">무게</h3>
                                {summaryDict.weightPositiveSummary[0]?
                                <><p className="positive_p"><strong>{`긍정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.weightPositiveSummary[0]}</p></div>
                                </div>    
                                </>:null}
                                {summaryDict.weightPositiveSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.weightPositiveSummary[1]}</p></div>
                                </div>    
                                </>:null}

                                {summaryDict.weightNegativeSummary[0]?
                                <><p><strong>{`부정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.weightNegativeSummary[0]}</p></div>
                                </div>
                                </>:null}
                                {summaryDict.weightNegativeSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.weightNegativeSummary[1]}</p></div>
                                </div>
                                </>:null}
                            </li>:null}
                            {summaryDict.performancePositivePercent||summaryDict.performanceNegativePercent?<li>
                                <h3 className="attribute_h3">성능</h3>
                                {summaryDict.performancePositiveSummary[0]?
                                <><p className="positive_p"><strong>{`긍정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.performancePositiveSummary[0]}</p></div>
                                </div>    
                                </>:null}
                                {summaryDict.performancePositiveSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.performancePositiveSummary[1]}</p></div>
                                </div>    
                                </>:null}

                                {summaryDict.performanceNegativeSummary[0]?
                                <><p><strong>{`부정`}</strong></p>
                                 <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.performanceNegativeSummary[0]}</p></div>
                                </div>    
                                </>:null}
                                {summaryDict.performanceNegativeSummary[1]?
                                <>
                                 <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.performanceNegativeSummary[1]}</p></div>
                                </div>    
                                </>:null}
                            </li>:null}
                            {summaryDict.noisePositivePercent||summaryDict.noiseNegativePercent?<li>
                                <h3 className="attribute_h3">소음</h3>
                                {summaryDict.noisePositiveSummary[0]?
                                <><p className="positive_p"><strong>{`긍정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.noisePositiveSummary[0]}</p></div>
                                </div>
                                </>:null}
                                {summaryDict.noisePositiveSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_positive"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.noisePositiveSummary[1]}</p></div>
                                </div>
                                </>:null}

                                {summaryDict.noiseNegativeSummary[0]?
                                <><p><strong>{`부정`}</strong></p>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.noiseNegativeSummary[0]}</p></div>
                                </div>    
                                </>:null}
                                {summaryDict.noiseNegativeSummary[1]?
                                <>
                                <div className="user_review">
                                    <div className="user_negative"><FaUser className="faUser" size={20} color={"#ffffff"}/></div>
                                    <div className="sentiment_box"><p>{summaryDict.noiseNegativeSummary[1]}</p></div>
                                </div>    
                                </>:null}
                            </li>:null}
                        </ul>
                    </div>
                </div>:null}
                
            </div>      
        </>
        );
    }
    else
        return <div className="spinner"><DotSpinner color="#A1A1A1" size={50}/></div>
    
});


export default SummaryBook;
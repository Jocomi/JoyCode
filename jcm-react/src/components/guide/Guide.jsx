import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { LoginUser } from '../../App'; // 로그인 상태 확인용 컨텍스트
import '../../css/guide/Guide.css';
import axios from 'axios';

const Guide = () => {
  const { data: loginUser } = useContext(LoginUser);
  const [isBootpayLoaded, setBootpayLoaded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [payProduct , setPayProduct] = useState([]);

  const openModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openSuccessModal = () => {
    setSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  // Bootpay 결제 요청 함수
  const requestPayment = async (price, productName, productId) => {
    if (!loginUser) {
      openModal("로그인 후 결제가 가능합니다.");
      return;
    }

    if (!isBootpayLoaded) {
      console.error("Bootpay script not loaded yet.");
      return;
    }

    try {
      const response = await window.Bootpay.requestPayment({
        application_id: process.env.REACT_APP_GUIDE_APPLICATION_ID,
        price: price,
        order_name: productName,
        order_id: productId,
        pg: '케이씨피',
        method: '카드',
        tax_free: 0,
        user: {
          id: loginUser.memberId,
          username: loginUser.memberName,
          phone: loginUser.phone,
          email: loginUser.email
        },
        items: [
          {
            id: productId,
            name: productName,
            qty: 1,
            price: price
          }
        ],
        extra: {
          open_type: 'iframe',
          card_quota: '0,2,3',
          escrow: false
        }
      });
      openSuccessModal();

      const paymentData = {
        payId: null,
        memberId: loginUser.memberId,
        payMethod: 'CARD',
        payProduct: productId,
        payPrice: price,
        payTime: new Date().toISOString(),
        payStatus: 'Y',
      };

      await sendPaymentToServer(paymentData);

    } catch (error) {
      console.error('결제 실패:', error);

      if (error.event === 'cancel' && error.error_code === 'RC_PROCESS_CANCELLED') {
        setModalMessage('결제를 취소하셨습니다.');
        setModalOpen(true);
      }
    }
  };

  const sendPaymentToServer = async (paymentData) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:7777/api/payment/success`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Failed to save payment info to the server");
      }

    } catch (error) {
      console.error("Error saving payment information:", error);
    }
  };

  // Bootpay 스크립트 로드
  useEffect(() => {
    selsectPaymentToServer()
    const script = document.createElement('script');
    script.src = 'https://js.bootpay.co.kr/bootpay-5.0.1.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setBootpayLoaded(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);
    // 로그인 유저의 결재정보 받아오는 api
    const selsectPaymentToServer = async () => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:7777/api/payment/select`, {
            params: loginUser ? { memberId: loginUser.memberId } : {},
        });
        const payments = response.data;
        if (Array.isArray(payments) && payments.length > 0) {
          // 최신 날짜 데이터 찾기
          const latestPayment = payments.reduce((latest, current) => {
            return new Date(current.payTime) > new Date(latest.payTime) ? current : latest;
          });
          setPayProduct(latestPayment.payProduct); // 최신 데이터의 payProduct 설정
          console.log("Latest Payment:", latestPayment);
    } 
    }catch (error) {
        // 오류 처리
        console.error("Error fetching payment information:", error.message);
        if (error.response) {
            console.error("Server error details:", error.response.data);
        }
    }
    };
  
  // payProduct와 현재 플랜 비교하여 버튼 비활성화 상태 결정
  const disabledStatus = ['VIP1', 'VIP2', 'VIP3'].map((vip, idx) => {
    if (!payProduct) return false; // 결제 정보가 없으면 모두 활성화
    if (payProduct === vip) return true; // 현재 요금제와 동일한 경우
    if (payProduct === 'VIP2' && idx === 0) return true; // VIP2일 경우 VIP1 비활성화
    if (payProduct === 'VIP3' && idx < 2) return true; // VIP3일 경우 VIP1, VIP2 비활성화
    return false; // 기본적으로 활성화
  });

  return (
    <div className='guide-container'>
      <div className="row">
        <div className="col-md-12 mb-5">
          <h2 className="main-head">Joy Code Me Pricing</h2>
          <p className="sub-head">Joy Code Me Product</p>
        </div>

        {/* 각 요금제 카드 */}
        {['VIP1 2024', 'VIP2 2024', 'VIP3 2024'].map((plan, index) => (
          <motion.div
            key={index}
            className="col-md-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ ease: 'easeInOut', duration: 1 }}
          >
            <div className={`pricing-table ${index === 0 ? 'purple' : index === 1 ? 'turquoise' : 'red'}`}>
              <div className="pricing-label">Fixed Price</div>
              <h2>{plan}</h2>
              <h5>{index === 0 ? 'UI 사용자를 위한 패키지' : index === 1 ? 'UI 및 기능 구현 전문가' : '웹 페이지 풀 제작기능'}</h5>
              <div className="pricing-features">
                <div className="feature">사용기능 <span>{index === 0 ? 'Web Page 제작' : index === 1 ? 'UI 및 기능 제작' : 'UI, 기능, DB 관리까지'}</span></div>
                <div className="feature">추가기능 <span>{index === 0 ? 'UI파일 다운로드' : index === 1 ? 'UI파일 다운로드' : 'UI파일 다운로드'}</span></div>
                <div className="feature">기존 구독자 <span>{index === 0 ? '없음' : index === 1 ? 'VIP1 환불' : 'VIP1, VIP2 환불'}</span></div>
                <div className="feature">상세문의 <span>eoms1014@gmail.com</span></div>
              </div>
              <div className="price-tag">
                <span className="symbol">₩</span>
                <span className="amount">{index === 0 ? '49,900' : index === 1 ? '99,900' : '199,900'}</span>
                <span className="after">/영구</span>
              </div>
              <button className="price-button"  disabled={disabledStatus[index]}  onClick={() => requestPayment(index === 0 ? 100 : index === 1 ? 200 : 300, plan, `VIP${index + 1}`)}
              >
                 {disabledStatus[index] ? 'Purchased' : 'Get Started'} {/* 버튼 텍스트 변경 */}
              </button>
            </div>
          </motion.div>
        ))}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p className="modal-message">{modalMessage}</p>
              <button className="modal-close-button" onClick={closeModal}>닫기</button>
            </div>
          </div>
        )}

        {isSuccessModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p className="modal-message">결제가 완료되었습니다! 감사합니다!</p>
              <button className="modal-close-button" onClick={closeSuccessModal}>닫기</button>
            </div>
          </div>
        )}


        {/* All plans Include section */}
        <div className="col-md-12 mt-5">
          <h3 className="section-head">All plans include</h3>
          <div className="all-plans-features">
            <div className="feature">
              <h4>Free HTML File Download</h4>
              <p>You can always save new HTML files for free. Create and save your favorite files with multiple new file requests. An easy and fast-generated page will give you a whole new experience.</p>
            </div>
            <div className="feature">
              <h4>Free Test Images</h4>
              <p>The free images provided by JCM allow you to implement various web pages in web page production. The images you provide can only be retrieved from them. So, users can download the project and use the images they want for the right path to create more customized, customized pages!</p>
            </div>
            <div className="feature">
              <h4>Sepportive Development Environment</h4>
              <p>
                JCM's code allows even beginners to easily access development using a free development environment provided to developers.The provided development environment is easily accessible at each site, so users can build development environments and use our programs through each site!<br/><br/>
                necessary tools:<br/>
                <a href="https://www.oracle.com/kr/java/technologies/downloads/">Java</a> <br/>
                <a href="https://spring.io/tools">SpringFramework</a><br/>
                <a href="https://code.visualstudio.com/download">VS code</a><br/>
                <a href="https://www.oracle.com/kr/database/technologies/xe-downloads.html">Oracle</a><br/>
                <a href="https://www.oracle.com/kr/database/sqldeveloper/technologies/download/">SQL Developer</a><br/><br/>
                Please refer to each website for detailed configuration information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;

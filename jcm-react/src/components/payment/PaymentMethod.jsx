import { NavLink } from 'react-router-dom';
import '../../css/payment/PaymentMethod.css';

const PayHistory = () => {
    return(
        <>
        <div class="payment-method">
            <ul>        
                <li><NavLink to="/paymentmethod"> <h3>결제 수단 관리</h3></NavLink></li>
                <li><NavLink to="/paymenthistory"> <h3>결제 기록</h3></NavLink></li>
            </ul>
            <div class="payment-section">
                <h2>일반 결제</h2>
                <button>계좌이체</button>
                <button>카드결제</button>
                <div class="payment-list">
                    <h2>결제 정보</h2>
                    <table>
                    <tr>
                        <th>카드 명칭</th>
                        <th>카드 번호</th>
                        <th>이름</th>
                        <th>카드사</th>
                        <th>유효기간</th>
                        <th>관리</th>
                    </tr>
                    <tr>
                        <td>내 카드</td>
                        <td>5594 1000 2293 9044</td>
                        <td>홍길동</td>
                        <td>신한카드</td>
                        <td>29/06</td>
                        <td>
                        <button class="edit-btn">수정</button>
                        <button class="delete-btn">삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td>회사 카드</td>
                        <td>2131 2341 2112 7895</td>
                        <td>고길동</td>
                        <td>비씨카드</td>
                        <td>27/01</td>
                        <td>
                        <button class="edit-btn">수정</button>
                        <button class="delete-btn">삭제</button>
                        </td>
                    </tr>
                    </table>
                </div>
                </div>
            </div>
        </>
    )
}

export default PayHistory;
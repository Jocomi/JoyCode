package com.jocomi.jcm.payment.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.jocomi.jcm.payment.model.Payment;

@Mapper
public interface PaymentMapper {

    // 결제 정보 저장 메서드
    int insertPayment(Payment payment);
}

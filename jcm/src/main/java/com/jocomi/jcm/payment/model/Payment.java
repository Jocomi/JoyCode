package com.jocomi.jcm.payment.model;

import lombok.Data;
import java.util.Date;

@Data
public class Payment {
    private String memberId; // MEMBER 테이블의 외래키
    private String payMethod;
    private String payProduct;
    private Integer payPrice;
    private Date payTime;
    private String payStatus;
}

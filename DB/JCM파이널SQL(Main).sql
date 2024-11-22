DROP TABLE PROJECT_RECOMMENT;
DROP TABLE FREE_RECOMMENT;
DROP TABLE PAYMENT;
DROP TABLE ENQUIRY_COMMENT;
DROP TABLE PROJECT_COMMENT;
DROP TABLE FREE_COMMENT;
DROP TABLE PROJECT_BOARD;
DROP TABLE ENQUIRY_BOARD;
DROP TABLE FREE_BOARD;
DROP TABLE ANNOUNCEMENT_BOARD;
DROP TABLE PROJECT_HISTORY;
DROP TABLE USER_RECOMMEND;
DROP TABLE MEMBER;
DROP TABLE REPORT_BOARD;
-- FREE_COMMENT SEQUENCE DELET
DROP SEQUENCE FREC_POST_NO;

-- PROJECT_COMMENT SEQUENCE DELET
DROP SEQUENCE PROC_POST_NO;

-- ENQUIRY_COMMENT SEQUENCE DELET
DROP SEQUENCE PROE_POST_NO;

-- ANNOUNCEMENT_BOARD SEQUENCE DELET
DROP SEQUENCE ANN_POST_NO;

-- FREE_BOARD SEQUENCE DELET
DROP SEQUENCE FRE_POST_NO;

-- ENQUIRY_BOARD SEQUENCE DELET
DROP SEQUENCE ENQ_POST_NO;

-- PROJECT_BOARD SEQUENCE DELET
DROP SEQUENCE PRO_POST_NO;

-- PROJECT_BOARD SEQUENCE DELET
DROP SEQUENCE H_SAVE_NO;
DROP SEQUENCE PRO_RECOMMENT_NO;

DROP SEQUENCE FRE_RECOMMENT_NO;

DROP SEQUENCE PAY_CODE;
DROP SEQUENCE REPORT_NO;

CREATE TABLE MEMBER (
	MEMBER_ID VARCHAR2(50) PRIMARY KEY,
	MEMBER_PWD VARCHAR2(100) NOT NULL,
	MEMBER_NAME VARCHAR2(50) NOT NULL,
    EMAIL VARCHAR2(50) NOT NULL,
	PHONE VARCHAR2(20) NOT NULL,
	BIRTH DATE NOT NULL,
	ADDRESS VARCHAR2(200) NOT NULL,
	STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN ('Y','N','A')),
	P_IMG VARCHAR2(200) DEFAULT NULL,
    MEMBER_DATE DATE DEFAULT SYSDATE NOT NULL
);

CREATE SEQUENCE H_SAVE_NO;
CREATE TABLE PROJECT_HISTORY (
	HISTORY_NO NUMBER PRIMARY KEY,
	MEMBER_ID REFERENCES MEMBER(MEMBER_ID),
	REQUEST VARCHAR2(4000) NOT NULL,
    USED_FUNCTION VARCHAR2(300) NOT NULL,
	HISTORY_TIME DATE DEFAULT SYSDATE NOT NULL,
	STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN ('Y','N'))
);

CREATE SEQUENCE ANN_POST_NO;
CREATE TABLE ANNOUNCEMENT_BOARD (
	POST_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_TITLE VARCHAR2(100) NOT NULL,
	POST_CONTENT VARCHAR2(4000) NOT NULL,
	POST_TIME DATE DEFAULT SYSDATE NOT NULL,
	COUNT_VIEW NUMBER DEFAULT 0,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);



CREATE SEQUENCE FRE_POST_NO;
CREATE TABLE FREE_BOARD (
	POST_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_TITLE VARCHAR2(100) NOT NULL,
	POST_CONTENT VARCHAR2(4000) NOT NULL,
	POST_TIME DATE DEFAULT SYSDATE NOT NULL,
	COUNT_VIEW NUMBER DEFAULT 0,
	RECOMMEND NUMBER DEFAULT 0,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);

CREATE SEQUENCE ENQ_POST_NO;
CREATE TABLE ENQUIRY_BOARD (
    POST_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_TITLE VARCHAR2(100) NOT NULL,
	POST_CONTENT VARCHAR2(4000) NOT NULL,
	POST_TIME DATE DEFAULT SYSDATE NOT NULL,
	COUNT_VIEW NUMBER DEFAULT 0,
	RECOMMEND NUMBER DEFAULT 0,
	PRIVATE_BOARD CHAR(1) DEFAULT 'N' CHECK (PRIVATE_BOARD IN('Y','N')),
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);
CREATE SEQUENCE PRO_POST_NO;
CREATE TABLE PROJECT_BOARD (
	POST_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_TITLE VARCHAR2(100) NOT NULL,
	POST_CONTENT VARCHAR2(4000) NOT NULL,
	POST_TIME DATE DEFAULT SYSDATE NOT NULL,
	COUNT_VIEW NUMBER DEFAULT 0,
	RECOMMEND NUMBER DEFAULT 0,
	PRIVATE_BOARD VARCHAR2(1) DEFAULT 'Y' CHECK (PRIVATE_BOARD IN('Y','N')),
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);

CREATE SEQUENCE FREC_POST_NO;
CREATE TABLE FREE_COMMENT (
	COMMENT_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_NO NUMBER REFERENCES FREE_BOARD(POST_NO),
	COMMENT_TEXT VARCHAR2(900) NOT NULL,
	COMMENT_TIME DATE DEFAULT SYSDATE NOT NULL,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);
CREATE SEQUENCE PROC_POST_NO;
CREATE TABLE PROJECT_COMMENT (
	COMMENT_NO NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	POST_NO NUMBER REFERENCES PROJECT_BOARD(POST_NO),
	COMMENT_TEXT VARCHAR2(900) NOT NULL,
	COMMENT_TIME DATE DEFAULT SYSDATE NOT NULL,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);

CREATE SEQUENCE PROE_POST_NO;
CREATE TABLE ENQUIRY_COMMENT (
	COMMENT_NO NUMBER PRIMARY KEY,
	POST_NO NUMBER REFERENCES ENQUIRY_BOARD(POST_NO),
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
	COMMENT_TEXT VARCHAR2(900) NOT NULL,
	COMMENT_TIME DATE DEFAULT SYSDATE NOT NULL,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);

CREATE SEQUENCE PAY_CODE;
CREATE TABLE PAYMENT (
    PAY_ID NUMBER PRIMARY KEY,
	MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
    PAY_METHOD VARCHAR2(20) DEFAULT 'CARD',
    PAY_PRODUCT VARCHAR2(20) NOT NULL,
    PAY_PRICE NUMBER NOT NULL,
    PAY_TIME DATE NOT NULL,
    PAY_STATUS CHAR(1) DEFAULT 'Y' NOT NULL
);

CREATE SEQUENCE FRE_RECOMMENT_NO;
CREATE TABLE FREE_RECOMMENT (
    RECOMMENT_NO NUMBER PRIMARY KEY,
    MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
    COMMENT_NO NUMBER REFERENCES FREE_COMMENT(COMMENT_NO),
    RECOMMENT_TEXT VARCHAR2(900) NOT NULL,
    RECOMMENT_TIME DATE DEFAULT SYSDATE NOT NULL,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);
CREATE SEQUENCE PRO_RECOMMENT_NO;
CREATE TABLE PROJECT_RECOMMENT (
    RECOMMENT_NO NUMBER PRIMARY KEY,
    MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
    COMMENT_NO NUMBER REFERENCES PROJECT_COMMENT(COMMENT_NO),
    RECOMMENT_TEXT VARCHAR2(900) NOT NULL,
    RECOMMENT_TIME DATE DEFAULT SYSDATE NOT NULL,
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);

CREATE TABLE USER_RECOMMEND (
    MEMBER_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
    POST_NO NUMBER,
    BOARD_TYPE VARCHAR2(50) CHECK (BOARD_TYPE IN ('FREE', 'PROJECT', 'ENQUIRY', 'ANNOUNCEMENT'))
   
);
CREATE SEQUENCE REPORT_NO;
CREATE TABLE REPORT_BOARD(
    REPORT_NO NUMBER PRIMARY KEY,
    POST_NO NUMBER,
    REPORT_ID VARCHAR2(50) REFERENCES MEMBER(MEMBER_ID),
    REPORT_TIME DATE DEFAULT SYSDATE NOT NULL,
    REPORT_TEXT VARCHAR2(300) NOT NULL,
    BOARD_TYPE VARCHAR2(50) CHECK (BOARD_TYPE IN ('FREE', 'PROJECT', 'ENQUIRY', 'ANNOUNCEMENT')),
    STATUS CHAR(1) DEFAULT 'Y' CHECK (STATUS IN('Y','N'))
);

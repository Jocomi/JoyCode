-- ���� �ּ�
/*
    ������ �ּ�
*/
SELECT * FROM DBA_USERS;    -- ���� ��� �����鿡 ���Ͽ� ��ȸ�ϴ� ��ɹ�
-- ��ɹ� ���� : �ʷϻ� �����ư Ŭ�� �Ǵ� Ctrl + Enter

-- �Ϲ� ����� ���� ���� ���� (������ �������θ� ����!)
-- [ǥ����] CREATE USER ������ IDENTIFIED BY ��й�ȣ;
CREATE USER "C##JCM" IDENTIFIED BY JCM;

-- ������ ����� ������ �ּ��� ���� (������ ����, ����) �ο�
-- [ǥ����] GRANT ����1, ����2, ... TO ������;
GRANT CONNECT, RESOURCE TO "C##JCM";

-- ���̺� �����̽� ���� ����
ALTER USER "C##JCM" DEFAULT TABLESPACE USERS QUOTA UNLIMITED ON USERS;







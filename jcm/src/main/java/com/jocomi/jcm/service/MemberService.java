package com.jocomi.jcm.service;


import org.springframework.stereotype.Service;

import com.jocomi.jcm.model.mapper.MemberMapper;
import com.jocomi.jcm.model.vo.Member;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberMapper mMapper;
	private final HttpSession session;

	public Member loginMember(Member member) {
		return mMapper.loginMember(member);
	}

	// 회원가입 기능 유지 (필요 시 사용 가능)
	public int registerMember(Member member) {
		return mMapper.insertMember(member);
	}

	// ID 중복 체크 메서드
    public int checkUserById(String id) {
        return mMapper.checkUserById(id);
    }

    // 이메일 중복 체크 메서드
    public int checkUserByEmail(String email) {
        return mMapper.checkUserByEmail(email);
    }

    // 전화번호 중복 체크 메서드
    public int checkUserByPhone(String phone) {
        return mMapper.checkUserByPhone(phone);
    }

	// 회원 ID 조회 메서드
	public int selectId(Member member) {
		return mMapper.selectId(member.getMemberId());
	}

	// 회원 정보 조회 메서드
	public Member memberProfile(String memberId) {
		return mMapper.memberProfile(memberId);
	}

	// 회원 정보 수정 메서드
	public int editProfile(Member member) {
		return mMapper.editProfile(member);
	}
	public int updateProfileImage(String memberId, String imagePath) {
	    return mMapper.updateProfileImage(memberId, imagePath);
	}
	
	public int registerNaverMember(Member member) {
		return mMapper.insertNaverMember(member);
	}

	public int editNaverProfile(Member member) {
		return mMapper.editNaverProfile(member);
	}
	
	// 비밀번호 변경
	public String changePassword(String memberId, String currentPwd, String newPwd) {
        // 현재 비밀번호가 맞는지 확인
        Member member = mMapper.memberProfile(memberId); // 회원 정보를 가져옴
        if (member == null || member.getMemberPwd() == null || !member.getMemberPwd().equals(currentPwd)) {
            return "현재 비밀번호가 틀렸습니다."; // 현재 비밀번호가 틀리면 오류 메시지 반환
        }

        // 새로운 비밀번호로 업데이트
        member.setMemberPwd(newPwd);
        int result = mMapper.updatePassword(member); // 비밀번호 업데이트
        if (result > 0) {
            // 비밀번호가 성공적으로 변경되었으면, 세션을 삭제하고 로그인 페이지로 리다이렉트
            session.invalidate();  // 세션 무효화 (로그아웃)
            return "비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.";  // 메시지 전달
        } else {
            return "비밀번호 변경에 실패했습니다.";
        }
    }
	
	public Member getLatestPayProduct(String memberId) {
	    return mMapper.getLatestPayProduct(memberId);
	}

}

package com.jocomi.jcm.recomment.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.jocomi.jcm.recomment.model.vo.Recomment;
import com.jocomi.jcm.recomment.service.RecommentService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class RecommentController {
	
	private final RecommentService rService;
	 // 댓글 번호(commentNo)를 받아 해당 댓글의 답글 리스트를 반환
    @GetMapping("/recomment/{boardType}/{commentNo}")
    public ResponseEntity<List<Recomment>> getRecommentsByCommentNo(@PathVariable int commentNo, @PathVariable String boardType) {
        List<Recomment> recomments = rService.getRecommentsByCommentNo(commentNo, boardType);
        return ResponseEntity.ok(recomments);  // 응답으로 답글 리스트 반환
    }
	@PostMapping("/recomment/{boardType}/{postNo}/add")
	public ResponseEntity<Map<String, Integer>> insertRecomment(@PathVariable int postNo, @PathVariable String boardType, @RequestBody Recomment recomment) {
	    System.out.println(recomment);
	    System.out.println(boardType);
	    int result = rService.insertRecomment(recomment, postNo, boardType);
	    
	    Map<String, Integer> response = new HashMap<>();
	    response.put("result", result);
	    
	    return ResponseEntity.ok(response);
	}
}

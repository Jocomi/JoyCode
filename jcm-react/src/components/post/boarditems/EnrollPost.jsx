import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../../css/post/EnrollPost.css';
import 'summernote/dist/summernote-lite.css';
import $ from 'jquery';
import 'summernote/dist/summernote-lite';

const EnrollPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [content, setContent] = useState(state?.postContent || '');
  const [title, setTitle] = useState(state?.postTitle || '');
  const [memberId, setMemberId] = useState('');
  const [visibility, setVisibility] = useState(state?.status || 'Y');
  const [boardType, setBoardType] = useState(state?.boardType || 'enquiry');
  const [post, setPost] = useState('');
  const postNo = state?.postNo;

  const fetchPost = async () => {
    try {
      const url = `http://${window.location.hostname}:7777/detail/${boardType}/${postNo}`;
      const response = await axios.get(url);
      setPost(response.data);
    } catch (error) {
      console.error('게시글 데이터를 가져오는 데 실패했습니다:', error);
    }
  };
  // 로그인 사용자 정보 가져오기
  useEffect(() => {
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
    if (loginUser) {
      setMemberId(loginUser.memberId);
    }
  }, []);
  useEffect(()=>{
    fetchPost();
  }, [])
 
  // Summernote 초기화
  useEffect(() => {
    $('#summernote').summernote({
      tabDisable: true,
      height: 500,
      width: '100%',
      disableResizeEditor: true,
      placeholder: '내용을 입력해 주세요.',
      lang: 'ko-KR',
      callbacks: {
        onChange: (contents) => {
          setContent(contents);
        },
        onImageUpload: async function (files) {
          // files가 배열인지 확인하고, 배열이 아니면 배열로 변환
          // const fileArray = Array.isArray(files) ? files : [files];  // 파일이 배열이 아니면 배열로 변환
      
          const formData = new FormData();
          
          Array.from(files).forEach(file => {
            formData.append('imgList', file);  // imgList로 여러 파일 전송
          });

          // console.log(files);
          // console.log(fileArray);
      
          try {
            const response = await axios.postForm(`http://${window.location.hostname}:7777/upload`, formData);
            // const response = await axios.post(`http://${window.location.hostname}:7777/upload`, formData, {
            //   headers: { 'Content-Type': 'multipart/form-data' },
            // });
      
            const imageUrls = response.data; // 서버에서 반환된 이미지 URL 목록
            imageUrls.forEach(url => {
              $('#summernote').summernote('editor.insertImage', `http://${window.location.hostname}:7777/${url}`); // 섬머노트에 이미지 삽입
            });
          } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
          }
        }
      }
    });

    // 컴포넌트 언마운트 시 섬머노트 인스턴스 해제
    return () => {
      $('#summernote').summernote('destroy');
    };
  }, []);

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 공개/비공개 변경 핸들러
  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  // 게시물 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 서버로 보낼 데이터 구성
    const postData = {
      postTitle : title,
      memberId,
      postContent : content,
      privateBoard: visibility,
      boardType,
    };

    try {
      const url = postNo
        ? `http://${window.location.hostname}:7777/update/${boardType}/${postNo}`
        : `http://${window.location.hostname}:7777/create/${boardType}`;
      const method = postNo ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: postData,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      alert(postNo ? '게시물이 수정되었습니다.' : '게시물이 등록되었습니다.');
      navigate(`/${boardType}Board`);
    } catch (error) {
      console.error('게시물 저장 실패:', error);
      alert('게시물 저장에 실패했습니다.');
    }
  };
  return (
    <div className="enroll-post">
      <div className="main-div">
        <form onSubmit={handleSubmit}>
          <div className="post-content-div">
            <h2>{postNo ? '게시물 수정' : '게시물 작성'}</h2>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">제목</span>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <div id="summernote" dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={boardType}
                onChange={(e) => setBoardType(e.target.value)}
              >
                <option value="enquiry">문의사항</option>
                <option value="free">자유게시판</option>
                <option value="project">프로젝트</option>
                <option value="announcement">공지사항</option>
              </select>
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                value={visibility}
                onChange={handleVisibilityChange}
              >
                <option value="Y">공개</option>
                <option value="N">비공개</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {postNo ? '수정하기' : '작성하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollPost;

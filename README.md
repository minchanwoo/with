## 1/22
- [x] Database - Sequelize / Mysql
- [x] Model - User
- [x] route POST /users/join
- [x] 회원가입 react 페이지 화면 구현
- [x] 회원가입 react 페이지 화면에 기능 적용

## 1/26
- [x] 회원가입 이메일 필드 포함
- [x] 비밀번호 확인값 필드 추가
- [x] 회원가입 클라이언트에서 검출 조건 추가 / 클라이언트 서버 모두
	- [x] 이메일 조건 정규식 (naver.com / gmail.com 만 허용)
	- [x] 비밀번호(최소 8자. 영소문자, 영대문자, 숫자 각각 최소 1글자씩.) 정규식
	- [x] 비밀번호와 비밀번호 확인값 불일치

## 1/28
- [x] react-router-dom 설치
- [x] 기존 회원가입 화면을 /join 주소로 이동
- [x] 로그인 화면(/login), 로그아웃 화면(/logout), 마이페이지(/mypage) 화면 구현(기능없는 빈 화면)
- [x] 메인화면 구현
- [x] 디자인 프레임워크(Semantic ui) 설치
- [x] 상단메뉴 구현
	- [x] 상단메뉴에 현재메뉴 active 적용
- [x] 로그인 (/login) 화면 기능 구현
	- [x] 가입되지 않은 이메일 에러 구현
	- [x] 비밀번호 오류 에러 구현

# 2/2
- [x] 회원가입 / 로그인 시 redirect
- [x] 로그인 상태에 따라 다른 상단메뉴 구현
	- [x] 로그인 시 로그아웃 버튼 / 마이페이지
	- [x] 로그인 아닐 시 회원가입 / 로그인 버튼

# 2/6
- [x] 계정 정보를 세션에 저장
- [x] 화면 변경시마다 로그인 정보 조회
- [x] 로그아웃
- [x] 마이페이지
	- [x] 계정 정보 조회
	- [x] 계정 정보 수정

# 2/9
- [x] 회원탈퇴
	- [x] 미로그인 상태에서 마이페이지 접속시 login 페이지 redirect
	- [x] 마이페이지에 회원탈퇴 버튼 추가 / 회원탈퇴 버튼 클릭 시 confirm 후 회원탈퇴 요청 함수 추가
	- [x] 회원탈퇴 route 구현
		- [x] User.deleted_at 을 현재 시각으로 변경
		- [x] session.destroy
	- [x] 회원가입, 로그인 요청 시 탈퇴한 계정 에러 표시 추가

# 3/9
- [x] 게시글 추가
- [x] 게시글 상세

# 3/12
- [x] 페이지네이션 구현
- [x] 게시글 삭제 구현

# 3/17
- [x] 좋아요
- [x] 마이페이지

# 3/26
- [x] 댓글

# 3/30
- [x] 프로필 이미지

# 4/6
- [x] 게시글에 이미지 추가

## Todo
- 게시판
	- U
- 검색
- 채팅
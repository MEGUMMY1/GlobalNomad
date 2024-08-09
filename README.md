# 🌐 GLOBAL_NOMAD
<div align="center">
https://globalnomad-5-8.netlify.app/
</div>

## 💡 서비스 소개
<div align="center">
<img src="https://github.com/user-attachments/assets/55a9c18b-0f8a-4012-bfca-914a4c2f86db" alt="image" width="600"/>
  <br>  <br>

> 사람들이 여행을 갈 때, 가서 뭘 할지, 비용은 얼마인지 등 여러 고민을 하게 된다. <br>
바쁜 현대인의 이런 고민을 줄여주기 위해 플랫폼 안에 잘 짜인 <br>체험 상품을 보고 간단하게 예약할 수 있는 서비스입니다.
<br>
</div>

## 🫂 팀원
<div align="center">
  
| 이름       | 역할                                                                                                                                             |
|------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| 💻 [황은지](https://github.com/eunji-0623)<br>　[👑PM]| - 내 체험 목록 페이지<br>- 체험 등록 및 수정 Form 구현<br>- 문의 채팅 구현                                                                             |
| 🫠 [김보민](https://github.com/bomin0830)  | - 로그인/회원가입 페이지<br>- access/refresh token 및 유저 관리<br>- 마이페이지 - 예약 내역 페이지 구현<br>- 페이지 별 메타데이터 관리<br>- 체험 공유하기      |
| 👏 [박수민](https://github.com/ssumai-kr)  | - 메인화면 구현<br>- 최근 방문 체험 목록 구현<br>- 카테고리 선택, 다크모드 토글 버튼, 검색 버튼 컴포넌트                                                 |
| 🚀 [정지성](https://github.com/Byukchong)  | - 유저 프로필<br>- SideNavigation<br>- Navigation Bar<br>- 마이 페이지 - 내 정보<br>- 프로젝트 발표                                                     |
| 🍟 [조혜진](https://github.com/MEGUMMY1)  | - Modal, Popup, Pagination, Footer 컴포넌트<br>- 체험 상세 페이지<br>- 예약 현황 페이지<br>- 다크모드 테마 구현                                            |

</div>

## 🧑‍💻 개발 환경
<div align="center">
<img src="https://github.com/user-attachments/assets/9eecd07b-f981-4231-a37d-0e1e87ed554d" alt="image" width="600"/>
</div>

## 📌 컨벤션
<details>
<summary>컨벤션</summary>

* 함수명, 변수명은 **Camel Case**로 작성합니다.
* 컴포넌트명은 **Pascal Case**로 작성합니다.
* 컴포넌트명은 **일반 함수**로, 이외 함수는 **화살표 함수**를 사용합니다.
* TYPE은 **INTERFACE**로 정의합니다.
* 공통 타입은 따로 관리하되, 한 컴포넌트에서만 사용되는 타입은 해당 폴더에서 관리합니다.
* TYPE 파일명은 `COMPONENT.types.ts` 로 정합니다.
* TYPE 이름은 `COMPONENT+’props’` 로 정합니다.
* PR명은 `태그: 커밋설명`으로 정합니다.

</details>

## 🛠️ CI/CD
* github actions를 활용해서 지속적 통합 및 배포
* 개인 브랜치에서 변경 사항을 Push하면, CI가 동작된다.
* 개인 브랜치에서 master로 Pull Request를 보내면, CI가 동작되고 build error가 없어야 Merge가 된다.
* Merge가 되면, 운영 리소스에 배포된다.

## 🏗️ 프로젝트 구조

<details>
<summary>프로젝트 구조</summary>
  
```
📦GlobalNomad
┣ 📂components
┃ ┣ 📂ActivityDetails
┃ ┃ ┣ 📂ImageContainer
┃ ┃ ┣ 📂Map
┃ ┃ ┣ 📂Reservation
┃ ┣ 📂AuthInputBox
┃ ┣ 📂Button
┃ ┣ 📂Calendar
┃ ┣ 📂CatergoryBtn
┃ ┣ 📂Chat
┃ ┣ 📂Chips
┃ ┣ 📂CustomCalendar
┃ ┣ 📂InputBox
┃ ┣ 📂KategorieDropdown
┃ ┣ 📂Lander
┃ ┣ 📂Layout
┃ ┣ 📂MetaData
┃ ┣ 📂Modal
┃ ┣ 📂MyActivity
┃ ┃ ┣ 📂Card
┃ ┃ ┗ 📂Register
┃ ┣ 📂MyPageInput
┃ ┣ 📂NavigationDropdown
┃ ┣ 📂Pagination
┃ ┣ 📂Popup
┃ ┣ 📂PriceFilterBtn
┃ ┣ 📂ReservationFilter
┃ ┣ 📂ReservationListCard
┃ ┣ 📂Review
┃ ┣ 📂SearchBar
┃ ┣ 📂ShareButton
┃ ┣ 📂SideNavigation
┃ ┣ 📂Spinner
┃ ┣ 📂StatusIndicator
┃ ┣ 📂Theme
┃ ┗ 📂ViewedActivities
┣ 📂docs
┃ ┗ 📜pull_request_template.md
┣ 📂hooks
┣ 📂pages
┃ ┣ 📂activity-details
┃ ┃ ┗ 📜[id].tsx
┃ ┣ 📂api
┃ ┃ ┣ 📂activities
┃ ┃ ┣ 📂auth
┃ ┃ ┣ 📂myActivities
┃ ┃ ┣ 📂myNotifications
┃ ┃ ┣ 📂myReservations
┃ ┃ ┣ 📂users
┃ ┣ 📂myactivity
┃ ┣ 📜404.tsx
┃ ┣ 📜calendar.tsx
┃ ┣ 📜index.tsx
┃ ┣ 📜login.tsx
┃ ┣ 📜mypage.tsx
┃ ┣ 📜reservation.tsx
┃ ┣ 📜signup.tsx
┃ ┣ 📜_app.tsx
┃ ┗ 📜_document.tsx
┣ 📂public
┃ ┣ 📂icon
┃ ┣ 📂image
┃ ┗ 📜favicon.ico
┣ 📂server
┣ 📂states
┣ 📂styles
┗ 📂utils
```

</details>

## 🎞️ 시연
<div align="center">

  ### [로그인] 
![login](https://github.com/user-attachments/assets/803476ca-40ec-465f-901f-1334222fe6d4)
  ### [메인화면1]
![landing](https://github.com/user-attachments/assets/78827ceb-355c-436b-9b95-c3fc52e26754)
  ### [메인화면2]
![landing2](https://github.com/user-attachments/assets/ef194c13-2aca-46f9-ae60-2d95c2712315)
  ### [예약 내역]
![reservationlist](https://github.com/user-attachments/assets/dc1ef0c8-ed93-4110-8eeb-c7baf834a01e)
  ### [체험 등록]
![register](https://github.com/user-attachments/assets/e1d3855b-ec05-406b-80f2-49205dae2ff5)
  ### [문의 채팅, 체험 수정]
![chatnedit](https://github.com/user-attachments/assets/7e152993-4d72-420c-89db-cc02f1632c0f)
  ### [예약 현황, 알림]
![calendarnnoti](https://github.com/user-attachments/assets/40298133-dcbb-49de-be1c-0cebfd467ec4)
  ### [체험 상세]
![activity](https://github.com/user-attachments/assets/1839fbdf-3d09-4bd4-9e5c-e8fe9d44f540)
  ### [모바일 반응형]
![mobile](https://github.com/user-attachments/assets/3bf9d537-1bc2-498a-9958-5dd05649b22e)
  
</div>

## 🤔 회고
<details>
<summary>⭐ KEEP</summary>

- 역할 분담이 잘 되었고, 맡은 작업에 충실히 임하여서 프로젝트 진행이 매끄러웠다.
- 소통이 원할하여 발생한 이슈나 공유 사항들을 전달함에 있어 어려움이 없었다.
- 추가 기능들을 고려하고 추가함에 있어서 열정적이다.
- 개인 파트 뿐만 아니라 전체적인 프로젝트 완성도를 위해서 노력했다.
- 의견을 다양하게 잘 내주신다. 문제 상황 발생 시 본인이 작업한 부분이 아니더라도 함께 해결하려고 노력한다. 이슈나 작업 상황 공유를 잘해주신다.
- 코어 타임을 정해 함께 작업하면서 원활하게 소통할 수 있었다. 팀 미팅과 노션을 통해 각자 작업 예상 기간을 공유하고, 그 기간 내에 작업을 완료함으로써 컴포넌트, hook 활용이 매끄러웠고, 프로젝트를 빠르게 완성할 수 있었다.
- 팀원 모두가 리팩토링과 기능 추가 부분에서도 적극적으로 참여하였다. 다양한 의견을 제시하고 피드백을 잘 수용했다.
- 모두가 코어타임에 집중하고 책임감 있게 참여하여 개발 속도와 완성도가 굉장히 높을 수 있었다.

</details>

<details>
<summary>⭐ TRY</summary>

- 다른 팀원분들이 작업한 부분은 어떻게 구현했는지 공유 시간을 갖는 것도 좋을 것 같다.
- 주석 열심히 달기 (특히 공용으로 자주 사용되는 hook 같은 것들!)
- 이슈와 해결 방법에 대한 내용을 정리해두었으면 좋았을 거 같다.
- 요구사항에 따른 테스트와 사용자 중심의 흐름 기반 테스트를 시도해보는 게 좋았을 것 같습니다.

</details>

<details>
<summary>⭐ PROBLEM</summary>

- 각자 작업했던 코드들이 쌓이다 보니, 다른 사람의 작업을 유심히 체크하지 못했다.
- 초반에는 주석을 열심히 달려고 노력했었는데, 후반으로 가면서 작업을 빨리 진행하려다 보니 주석을 많이 못 달았던 것 같다.
- 초반에 빠르게 작업하다 보니 폴더 구조와 주석 처리가 깔끔하지 못한 면이 있었다.
- 테스트 과정이 미흡하지 않았나 하는 생각이 든다.

</details>

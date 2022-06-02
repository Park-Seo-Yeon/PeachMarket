# 🍑PeachMarket

<div>
<img src = "https://user-images.githubusercontent.com/71807768/171102116-b4a23e55-d93a-43c3-adea-988ee2e64ede.png" width = "100%">
	</div>
중고 거래 마켓 서비스에 가상 피팅 기능을 도입한 웹페이지이다. 판매자와 구매자간의 사이즈와 관련한 반복적인 질문의 빈도수를 
줄이고, 구매 전 시착이 어려운 중고 마켓의 특성을 해결하여 성공적인 구매 결정을 돕는다.

<details>
<summary><h2> 📋목차</summary>
<ul>
<li><a href="#team">팀 구성</a></li>

<li><a href="#tool">개발 도구</li>

<li><a href="#display">실행 화면</a></li>

<li><a href="#architecture">작품 구조</a></li>

<li><a href="#effect">기대 효과</a></li>

<li><a href="#environment">가상피팅 환경설정</a></li>

<li><a href="#references">참고자료</a></li>

</details>

<h2 id = "team"> 👩‍💻팀 구성👨‍💻</h2>
<table border="1" width = "100%" >
<tr  align ="center">
	<td colspan = "4" >한성대학교 컴퓨터공학부 캡스톤디자인 #18팀</td>
    </tr>
    <tr  align ="center">
	<td colspan = "4" >Peaches</td>
    </tr>
    <tr align = "center">
	<td colspan = "4">정인환 지도교수님</td>
    </tr>
    <tr>
  <td align = "center" width="25%">김수현(팀장)</td>
	<td align = "center" width="25%">김태경</td>
	<td align = "center" width="25%">박서연</td>
	<td align = "center" width="25%">이지수</td>
    </tr>
    <tr>
	<td><li>가상피팅 및 서버 구현</td>
	<td><li>클라이언트 구현</td>
	<td><li>클라이언트 구현
  <li>AWS 관리</td>
	<td><li>마켓 서버 구현
  <li>DB 관리</td>
    </tr>
</table>

<h2 id = "tool">🏗️개발 도구</h2>

<ul>
<li>개발 언어 : Java, Python, MySQL, JavaScript, CSS, HTML
<li>개발 도구 : Visual Studio Code, Eclipse, Anaconda
<li>주요 기술 : Spring boot, React, Bootstrap, Flask, Tensorflow, PyTorch, Amazon S3, Amazon EC2, Amazon RDS, REST API
</ul>

<h2 id = "display"> 🎈실행 화면</h2>
<img src = "https://user-images.githubusercontent.com/71807768/171151141-d3e6babc-1e00-4254-8126-1b4ca751e038.png" width = "100%">

<h2 id = "architecture">🔍작품 구조</h2>

<img src = "https://user-images.githubusercontent.com/71807768/171154488-524ecf91-1e07-4f50-b778-e22faccee749.png" width = "100%">

<h2 id = "effect">🚀기대 효과</h2>

<ul>
<li> 보장성 : 옷 핏 및 자신의 피부색과의 어울림을 가상 피팅을 통해 미리 확인함으로써 구매 실패를 방지
<li>편의성 : 판매자와 구매자간의 사이즈와 관련한 반복적인 문답 및 치수 정보 획득을 위한 인터넷 조사의 번거로움 감소
</ul>
<details>
<summary><h2 id = "environment">⚙️가상피팅 환경설정</h2></summary>
<h3>python version : 3.7.10</h3>
<ol>
<li>rembg 오픈소스 clone 후 
<ul>
<li>pip install rembg
</ul>
<li>AWS EC2-Amazon linux 환경
<ul>
<li>sudo yum install -y gcc

<li>sudo yum install -y gcc-c++
</ul>
<li>설치가 필요한 파이썬 라이브러리
<ul>aiohttp==3.8.1
<li>asyncer==0.0.1
<li>click==8.0.3
<li>fastapi==0.72.0
<li>filetype==1.0.9
<li>gdown==4.4.0
<li>numpy==1.22.3
<li>onnxruntime==1.10.0
<li>pillow==9.0.1
<li>pymatting==1.1.5
<li>python-multipart==0.0.5
<li>scikit-image==0.19.1
<li>scipy==1.8.0
<li>tqdm==4.62.3
<li>uvicorn==0.17.0
<li>watchdog==2.1.7
<li>flask==1.1.2
<li>flask-cors==3.0.10
<li>boto==2.49.0
<li>boto3==1.23.9
<li>matplotlib==3.4.3
<li>werkzeug==2.0.2
<li>jinja2==2.10.1
<li>MarkupSafe==2.0.1
<li>itsdangerous==2.0.1
<li>opencv-contrib-python==4.5.5.64
<li>opencv-python==4.5.5.64
<li>opencv-python-headless==4.5.5.64
<li>parso
<li>imutils==0.5.4
<li>cmake==3.22.4
<li>dlib==19.24.0

</ul>

</ol>
</details>

<h2 id = "references">📝참고자료</h2>

<ul>
<li>배경제거 : Daniel Gatis. 2020. Rembg. https://github.com/danielgatis/rembg. (2022).
<li>모델 파싱 및 포즈 추정 : Clay Gong, Achal Shah. 2018. LIP_JPPNet. https://github.com/Engineering-Course/LIP_JPPNet. (2022)
<li>Key point 추출 : CMU-Perceptual-Computing-Lab. 2020. OpenPose. https://github.com/CMU-Perceptual-Computing-Lab/openpose. (2022).
<li> 가상 피팅 : Matiur Rahman Minar. 2020. CP-VTON+. https://github.com/minar09/cp-vton-plus. (2022).
</ul>

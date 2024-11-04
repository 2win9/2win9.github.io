import React from "react"
import styled from "styled-components"
import Layout from "../components/Layout"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import { Link } from "gatsby"

const ResumeContainer = styled.div`
  width: 100%;
  min-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  line-height: 1.6;
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Name = styled.h1`
  font-size: 2.8rem;
`

const Role = styled.span`
  font-size: 1.2rem;
`

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`

const Contact = styled.div`

  gap: 1rem;
  margin-bottom: 0.1rem;

  & a {
    margin-right: 9.6px;
  }

  & svg {
    width: 25.6px;
    height: 25.6px;
    cursor: pointer;
  }

  & svg path {
    fill: ${props => props.theme.colors.icon};
    transition: fill 0.3s;
  }

  & a:hover svg path {
    fill: ${props => props.theme.colors.text};
  }
`

const SectionOtherContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
`

const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1.5rem 0;
`

const LeftSection = styled.div`
  width: 22%;
  text-align: right;
  padding-right: 1rem;
`

const RightSection = styled.div`
  width: 70%;
  text-align: left;
  padding-left: 1rem;
`

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #6c757d;
  font-weight: normal;
  border-bottom: 3px dotted #C0C0C0;
  padding-bottom: 0.5rem;
  text-align: center;
`

const Description = styled.p`
  margin-top: 0.5rem;
    & strong {
    font-weight: bold; /* 강한 두께를 보장 */
  }
`

const DescriptionPeriod = styled.p`
  color: #6c757d;
`

const DescriptionTitle = styled.h2`
  font-size: 1.5rem; /* 적절한 크기로 조정 */
  font-weight: normal;
`;

const DescriptionOther = styled.h3`
  font-size: 1.3rem; /* 적절한 크기로 조정 */
  font-weight: normal;
`;


const Photo = styled.img`
  width: 150px;
  height: 190px;
  border-radius: 15%;
  margin-right: 2rem;
  margin-left: 3rem;
`

const Highlight = styled.span`
  background-color: #e0f7fa; /* 연한 파란색 배경 */
  color: #007bff; /* 파란색 텍스트 */
  padding: 0.1em 0.2em;
  border-radius: 0.4em;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  margin-right: 0.5em;
  display: inline-block;
`;



const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;

  & li {
    position: relative;
    color: ${props => props.theme.colors.text}; /* 텍스트 색상을 동적으로 설정 */
  }

  & li::marker {
    font-size: 1.2em;
    color: ${props => props.theme.colors.text}; /* 마커 색상을 동적으로 설정 */
    background-color: ${props => props.theme.colors.background}; /* 마커의 배경 색상 설정 */
    border-radius: 50%;
    padding: 0.1em;
  }
`



const ResumePage = () => {
  return (
    <Layout>
      <ResumeContainer>
        <HeaderContainer>
          <div>
            <Name>이승구</Name>
            <Role>백엔드 개발자</Role>
          </div>

          <ContactContainer>
            <Contact>
              <a href="https://github.com/2win9" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
              <a href="mailto:jeomjang2@gmail.com" target="_blank" rel="noreferrer">
                <FaEnvelope />
              </a>
            </Contact>
            {/* <span>Phone: 010-8489-9906</span> */}
            <span>Email: jeomjang2@gmail.com</span>
          </ContactContainer>
        </HeaderContainer>

        {/* About Section */}
        <SectionTitle>About Me</SectionTitle>
        <SectionContainer>
          <LeftSection>
            <Photo src="../profile2.jpg" alt="Profile Photo" />
          </LeftSection>
          <RightSection>
            <Description>
              풀스택 소프트웨어 엔지니어가 되기 위해 여러 가지 경험을 쌓고 있습니다. 논리적이고 깊이 있는 사고를 즐기며, 개발을 통해 더 나은 세상을 추구합니다.<br></br>
              <br></br>
              <Highlight>Interests</Highlight> <strong> BE, Mobile Programming, Cloud</strong><br></br>
              <Highlight>Skills</Highlight><strong> Spring Boot, Node.js, Express, Android Studio, MongoDB, MySQL, PostgreSQL</strong>
            </Description>
          </RightSection>
        </SectionContainer>



        {/* Project Section */}
        <SectionTitle>Project</SectionTitle>

        <SectionContainer>
          <LeftSection>
            <Description>
              <DescriptionTitle>얼굴 인식<br></br>출입체계 시스템</DescriptionTitle>
              <DescriptionPeriod>2024. 01 ~ 2024. 03</DescriptionPeriod>
              <Contact>
              <a href="https://github.com/yeonghune/Face_Access_System" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
            </Contact>
            </Description>
          </LeftSection>
          <RightSection>
            <Description>
                <strong>얼굴 인식을 통한 회원 출입과 성별 인식으로 방문자 파악을 돕는 출입 시스템<br></br></strong>
                기술스택 : 
                <Highlight>Node.js</Highlight>
                <Highlight>Express</Highlight>
                <Highlight>MongoDB</Highlight>
                <Highlight>Handlebars</Highlight>
                <Highlight>PyQt5</Highlight>
                <Highlight>Flask</Highlight><br></br>
              <list>
                <li>
                    데이터베이스를 구축하는 과정에서 생긴 문제를 해결<br></br>→ 컬렉션과 데이터베이스의 개념을 명확히 인지하여 문제를 해결. 기본기를 확실히 하는 계기가 됨
                </li>
                <li>
                    서버 사이드 렌더링(SSR) 템플릿 엔진을 사용하여 관리자 페이지 프론트엔드를 효율적으로 구현
                </li>
                <li>
                    외부 딥러닝 서버와 임베디드 기기 간 통신을 위한 회원 데이터 API 서버 개발<br></br>→ 효율적인 서버 아키텍처 구축을 위해 MVC 패턴과 REST API를 프로젝트에 적용
                </li>
                <li>
                    회원 관리 도메인 개발 (회원 등록, 회원 목록 조회, 회원 수정, 회원 삭제)
                </li>
                <li>
                    환경 변수를 외부 파일에 따로 관리하여, 프로젝트 보안성 향상과 유연성에 기여
                </li>
              </list>
            </Description>
          </RightSection>
        </SectionContainer>

        <SectionContainer>
          <LeftSection>
            <Description>
              <DescriptionTitle>홈트왕</DescriptionTitle>
              <DescriptionPeriod>2023. 09 ~ 2024. 10</DescriptionPeriod>
              <Contact>
              <a href="https://maize-twist-b81.notion.site/d8681fbb46604bf491a7ee9dec00c534?pvs=4" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
            </Contact>
            </Description>
          </LeftSection>
          <RightSection>
            <Description>
                <strong>스쿼트 측정과 자세 교정을 해주는 안드로이드 모바일 앱 프로젝트<br></br></strong>
                기술스택 : 
                <Highlight>Android Studio</Highlight>
                <Highlight>Java</Highlight>
                <Highlight>Figma</Highlight><br></br>
              <list>
                <li>
                    온디바이스 머신러닝 SDK ML Kit을 사용하여 스쿼트 측정 모듈 구현
                </li>
                <li>
                    Java 기반의 ML kit의 PoseDetection을 추출 및 재구현하여 프로젝트에 적용
                </li>
                <li>
                    CameraX API를 통한 신체 화면 Key Point 렌더링 기능 개발
                </li>
                <li>
                    좌표값을 이용하여 자세 측정 및 교정 기능 개발
                </li>
              </list>
            </Description>
          </RightSection>
        </SectionContainer>

        <SectionContainer>
          <LeftSection>
            <Description>
              <DescriptionTitle>노인 인솔 시스템</DescriptionTitle>
              <DescriptionPeriod>2024. 03 ~ 2024. 05</DescriptionPeriod>
              <Contact>
              <a href="https://github.com/2win9/Capstone" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
            </Contact>
            </Description>
          </LeftSection>
          
          <RightSection>
            <Description>
                <strong>피인솔자를 위한 실시간 GPS 기반의 노인 인솔 하이브리드 모바일 애플리케이션<br></br></strong>
                
                기술스택 : 
                <Highlight>React Native CLI</Highlight>
                <Highlight>Spring Boot</Highlight>
                <Highlight>PostgreSQL</Highlight>
                <Highlight>Android Studio</Highlight>
                <Highlight>StarUML</Highlight>
                <Highlight>Notion</Highlight><br></br>
              <list>
                <li>
                    피인솔자 실시간 위치 전송 기능 개발 (react-native-geolocation-service 라이브러리 사용)
                </li>
                <li>
                    서버와 위치좌표 통신을 위한 웹소켓 통신 사용<br></br>→ 기존 웹소켓이 동작하지 않던 문제를 WebSocket 객체의 중복 임포트 확인으로 해결
                </li>
                <li>
                    클라이언트의 OTP 송수신 기능 개발
                </li>
              </list>
            </Description>
          </RightSection>
        </SectionContainer>






        {/* Experience Section */}
        <SectionTitle>Experience</SectionTitle>
        <SectionContainer>
          <LeftSection>
            <Description>
              <DescriptionTitle>임베디드 비전 연구실</DescriptionTitle>
              <strong>학부연구생</strong>
              <DescriptionPeriod>2023. 09 ~ 2024. 06</DescriptionPeriod>
            </Description>
          </LeftSection>
          <RightSection>
            <Description>
                <List>
                    <li>
                    <strong>산학협력 프로젝트 "얼굴 인식 출입체계 시스템" 수행</strong><br />
                    </li>
                    <li>
                        <strong>프론트엔드 프레임워크 Vue.js, Angular.js, React에 대한 차이점 조사 및 연구</strong>
                    </li>
                    <li>
                        <strong>산학협력 프로젝트 "하이브리드 발전 시스템" 수행<br></br> → 인버터와 라즈베리파이 원격 제어용 모바일 앱 개발</strong>
                    </li>
                    <li>
                        <strong>연구실 웹 사이트 일부 개발<br></br> → Spring Security를 사용하여 JWT 기반의 회원 도메인(회원가입, 로그인) 기능 개발 </strong>
                    </li>

                </List>
            </Description>
          </RightSection>
        </SectionContainer>

        {/* Education Section */}
        <SectionTitle>Education</SectionTitle>
        <SectionContainer>
          <LeftSection>
            <Description>
            <DescriptionTitle>안동대학교</DescriptionTitle>
              <strong>컴퓨터공학 학사</strong>
              <DescriptionPeriod>2021. 03 ~ 2025. 02</DescriptionPeriod>
            </Description>
          </LeftSection>
          <RightSection>
            <Description>
              <strong>GPA : 4.15 / 4.5<br></br></strong>
              <strong>이수학점 : 150<br></br></strong>
              <strong>총 7회 성적 장학금을 포함 각종 장학금 23,883,400원 수혜<br></br></strong>
              
            </Description>
          </RightSection>
        </SectionContainer>

        <SectionContainer>
          <LeftSection>
            <Description>
            <DescriptionTitle>경북 클라우드 <br></br>전문인력 양성과정</DescriptionTitle>
              <strong>1기 교육생</strong>
              <DescriptionPeriod>2024. 09 ~ 2024. 12</DescriptionPeriod>
            </Description>
          </LeftSection>
          <RightSection>
            <Description>
              
              
            </Description>
          </RightSection>
        </SectionContainer>

        {/* Skills Section */}
        <SectionTitle>Other Information</SectionTitle>

        
        <SectionOtherContainer>
          <LeftSection>
          <DescriptionTitle>자격증 및 어학사항</DescriptionTitle>
          <DescriptionPeriod>2024. 06</DescriptionPeriod>
          </LeftSection>
          <RightSection>
            <br></br>
            <DescriptionOther>정보처리기사</DescriptionOther><DescriptionPeriod>한국산업인력공단</DescriptionPeriod>
            
          </RightSection>
        </SectionOtherContainer>

        <SectionOtherContainer>
          <LeftSection>
          <DescriptionPeriod>2024. 08</DescriptionPeriod>
          </LeftSection>
          <RightSection>
            <DescriptionOther>TOEIC Speaking - IH 150</DescriptionOther><DescriptionPeriod>ETS</DescriptionPeriod>
          </RightSection>
        </SectionOtherContainer>

        <SectionOtherContainer>
          <LeftSection>
          <DescriptionPeriod>2023. 08</DescriptionPeriod>
          </LeftSection>
          <RightSection>
            <DescriptionOther>TOEIC - 755</DescriptionOther><DescriptionPeriod>ETS</DescriptionPeriod>
          </RightSection>
        </SectionOtherContainer>


        <SectionOtherContainer>
          <LeftSection>
          <DescriptionTitle>수상경력 및 기타</DescriptionTitle>
          <DescriptionPeriod>2024. 05</DescriptionPeriod>
          </LeftSection>
          <RightSection>
            <br></br>
            <DescriptionOther>[동상] 대경권 대학생 프로그래밍 경진대회</DescriptionOther><DescriptionPeriod>안동대학교</DescriptionPeriod>
            
          </RightSection>
        </SectionOtherContainer>

        <SectionOtherContainer>
          <LeftSection>
          <DescriptionPeriod>2023. 10</DescriptionPeriod>
          </LeftSection>
          <RightSection>
            <DescriptionOther>[최우수상] 신산업 Co-Ed 산업체 멘토링 캡스톤 디자인 최종발표회</DescriptionOther><DescriptionPeriod>안동대학교</DescriptionPeriod>
            
          </RightSection>
        </SectionOtherContainer>

        <SectionOtherContainer>
          <LeftSection>
          <DescriptionPeriod>2023. 11</DescriptionPeriod>
          </LeftSection>
          <RightSection>
            <DescriptionOther>[대상] 창업 아이디어 경진대회</DescriptionOther><DescriptionPeriod>안동대학교</DescriptionPeriod>
            
          </RightSection>
        </SectionOtherContainer>

        <SectionOtherContainer>
          <LeftSection>
          <DescriptionPeriod>2023. 02</DescriptionPeriod>
          </LeftSection>
          <RightSection>
            <DescriptionOther>[수료] English as a Second Language(ESL) 4 weeks</DescriptionOther><DescriptionPeriod>SSLC in Canada</DescriptionPeriod>
            
          </RightSection>
        </SectionOtherContainer>

        {/* Navigation */}
        <div style={{ margin: "2rem 0", display: "flex", justifyContent: "space-between" }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </ResumeContainer>
    </Layout>
  )
}

export default ResumePage

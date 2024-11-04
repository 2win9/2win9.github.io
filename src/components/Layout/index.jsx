import React, { useEffect } from "react"
import { ThemeProvider } from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { setLight, setDark } from "reducers/theme"
import { light, dark } from "assets/theme"
import GlobalStyles from "components/GlobalStyles"
import Header from "./Header"
import Body from "./Body"
import BodyResume from "./BodyResume" // 새로 추가한 컴포넌트
import Footer from "./Footer"
import { useLocation } from "@reach/router" // Gatsby의 useLocation 훅 사용

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.theme)

  let isSystemDarkMode = null
  if (typeof window !== "undefined") {
    isSystemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  }

  let localTheme = null
  if (typeof localStorage !== "undefined") {
    localTheme = localStorage.getItem("theme")
  }

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    dispatch(nextTheme === "dark" ? setDark : setLight)
    localStorage.setItem("theme", nextTheme)
  }

  useEffect(() => {
    if (isSystemDarkMode && !localTheme)
      dispatch(isSystemDarkMode ? setDark : setLight)
    else if (localTheme) dispatch(localTheme === "dark" ? setDark : setLight)
  }, [])

  const location = useLocation(); // 현재 위치 가져오기
  const currentPath = location.pathname; // 현재 경로
  const isResumePage = currentPath === "/resume" || currentPath === "/resume/";

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyles />
      <Header toggleTheme={toggleTheme} />
      {isResumePage ? (
        <BodyResume>{children}</BodyResume> // resume 페이지일 때
      ) : (
        <Body>{children}</Body> // 그 외 페이지일 때
      )}
      <Footer />
    </ThemeProvider>
  )
}

export default Layout

import React from "react"
import styled from "styled-components"

const BodyResumeWrapper = styled.div`
  margin: 0 auto;
  padding-top: 80px;
  max-width: 1080px;

`

const BodyResume = ({ children }) => {
  return <BodyResumeWrapper>{children}</BodyResumeWrapper>
}

export default BodyResume




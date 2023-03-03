import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import { StyledLayoutContainer } from './styles'

function DefaultLayout() {
  return (
    <StyledLayoutContainer>
      <Header />
      <Outlet />
    </StyledLayoutContainer>
  )
}

export default DefaultLayout

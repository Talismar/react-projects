import React from "react";
import styled from "styled-components";
import Summary from "../Summary";
import TransctionsTable from "../TransctionsTable";

function Dashboard() {
  return (
    <StyledContainer>
      <Summary />
      <TransctionsTable />
    </StyledContainer>
  );
}

export default Dashboard;

const StyledContainer = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
`;

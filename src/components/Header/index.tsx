import React from "react";
import styled from "styled-components";
import logoImg from "../../assets/logo.svg";

interface Props {
  onOpenNewTransactionModal: () => void;
}

export default function Header({ onOpenNewTransactionModal }: Props) {
  return (
    <StyledContainer>
      <StyledContent>
        <img src={logoImg} alt="dt money" />

        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </StyledContent>
    </StyledContainer>
  );
}

const StyledContainer = styled.header`
  background-color: var(--blue);
`;

const StyledContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1rem;
    color: #fff;
    background-color: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

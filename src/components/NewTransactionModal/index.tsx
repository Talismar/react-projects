import React from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import styled from "styled-components";
import { transparentize } from "polished";
import { useTransactions } from "../../hooks/useTransactions";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

function NewTransactionModal({ isOpen, onRequestClose }: Props) {
  const { createTransaction } = useTransactions();
  const [type, setType] = React.useState<"deposit" | "withdraw">("deposit");
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [category, setCategory] = React.useState("");

  async function handleCreateNewTransaction(event: React.FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <StyledContainer onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <StyledTransactionTypeContainer>
          <StyledRadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => {
              setType("deposit");
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </StyledRadioBox>

          <StyledRadioBox
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => {
              setType("withdraw");
            }}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </StyledRadioBox>
        </StyledTransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </StyledContainer>
    </Modal>
  );
}

export default NewTransactionModal;

const StyledContainer = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: #e7e9ee;
    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    // Todo input que estiver antes outro input vai aplicar este estilo
    & + input {
      margin-top: 1rem;
    }
  }
  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background-color: var(--green);
    color: var(--shape);
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

const StyledTransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

interface StyledRadioBoxProps {
  isActive: boolean;
  activeColor: "green" | "red";
}

const colors = {
  green: "#33CC95",
  red: "#E62E4D",
};

const StyledRadioBox = styled.button<StyledRadioBoxProps>`
  height: 4rem;
  border: 1px solid #d7d7d7;
  border-radius: 0.25rem;

  background: ${({ isActive, activeColor }) =>
    isActive ? transparentize(0.9, colors[activeColor]) : "transparent"};

  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;

  &:hover {
    border-color: #aaa;
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }
`;

import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  p {
    font-size: 14px;
    font-weight: 300;
    margin: 2rem 0 1rem;
  }
`;

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  outline: 0;

  font-size: 14px;
  font-weight: 300;
  margin: 2rem 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = ({ todos }) => {
  // 從 TodoPage 傳遞 todos 進來 再用 length 去算出項目數 就不用另外建立狀態
  return (
    <StyledFooter>
      <p>剩餘項目數： {todos.length}</p>
      <StyledButton>登出</StyledButton>
    </StyledFooter>
  );
};

export default Footer;

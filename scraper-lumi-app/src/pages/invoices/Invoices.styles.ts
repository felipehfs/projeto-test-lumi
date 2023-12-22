import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.gray};
`;

export const Header = styled.header`
  width: 100%;
  height: 63px;
  padding: 0.8rem 12rem;
  background-color: ${({ theme }) => theme.color.primary};

  h1 {
    color: ${({ theme }) => theme.color.white};
    font-size: 2.4rem;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.md}) {
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 0.8rem;
  }
`;

export const Section = styled.section`
  padding: 4rem 10rem 4rem 12rem;

  h1 {
    font-size: 3.2rem;
  }
  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.md}) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Card = styled.div`
  margin-top: 1.6rem;
  background-color: ${({ theme }) => theme.color.white};
  overflow: hidden;
  border-radius: 0.8rem;
  padding: 0.8rem;
  width: 40%;

  @media screen and (max-width: ${({ theme }) => theme.mediaScreen.md}) {
    width: 100%;
  }
`;

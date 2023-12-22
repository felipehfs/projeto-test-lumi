import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${({ theme})=> theme.color.gray};
`;

export const Header = styled.header`
    width: 100%;
    height: 63px;
    padding: 0.8rem 12rem;
    background-color: ${({ theme}) => theme.color.primary};

    h1 {
        color: ${({ theme}) => theme.color.white};
        font-size: 2.4rem;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: ${({theme}) => theme.mediaScreen.md}){
        display: flex;
        flex-direction: column;
        height: auto;
        padding: .8rem;
    }
`

export const Search = styled.form`
    display: flex;
    align-items: center;
    gap: 24px;
    @media screen and (max-width: ${({theme}) => theme.mediaScreen.md}){
        flex-direction: column;
    }
`

export const Main = styled.main`
    padding: 4rem 10rem 2rem 4rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2.4rem;
    @media screen and (max-width: ${({theme}) => theme.mediaScreen.md}){
        display: flex;
        padding: 4rem 0;
        flex-direction: column;
    }
`

export const Section = styled.section`
    padding: 0rem 10rem 0 4rem;
    width: 100%;

    @media screen and (max-width: ${({theme}) => theme.mediaScreen.md}){
        padding-left: 0;
        overflow-x: auto;
    }

    header {
        display: flex;
        justify-content: flex-end;
        padding-bottom: .8rem;
    }

`
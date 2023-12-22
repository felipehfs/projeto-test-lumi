import styled from '@emotion/styled'

export const Container = styled.div`
    width: 80%;
    border-radius: 8px;
    gap: 1.6rem;
    padding: 1.6rem;
    margin: 4rem auto;
    background-color: ${({ theme}) => theme.color.white};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const Image = styled.img`
    width: 300px;
    height: auto;
`
export const Title = styled.h2`
    font-size: 3.2rem;
    color: #333;
`

export const Text = styled.p`
    font-size: 2.4rem;
`

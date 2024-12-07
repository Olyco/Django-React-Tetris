import styled from 'styled-components';

export const StyledField = styled.div`
    height: 100%;
    aspect-ratio: 1 / 2;
    margin: auto 7px auto 20vw;
    display: grid;
    border: 7px solid rgb(25, 0, 51);
    border-radius: 10px;    
    grid-template-rows: repeat(${props => (props.rownum)}, 1fr);
    grid-template-columns: repeat(${props => props.colnum}, 1fr);
    gap: 0.8px;
`

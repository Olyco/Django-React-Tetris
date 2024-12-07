import styled from 'styled-components';

export const StyledBlock = styled.div`
    height: auto;
    aspect-ratio: 1 / 1;
    background: rgba(${props => props.color}, 1);
    border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
    border-radius: ${props => (props.type === 0 ? '0px' : '2px')}; 
    border-bottom-color: rgba(255, 255, 255, 0.1) !important;
    border-top-color: rgba(255, 255, 255, 0.3) !important;
    border-right-color: rgba(255, 255, 255, 0.3) !important;
    border-left-color: rgba(255, 255, 255, 0.1) !important;
`
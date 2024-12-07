import Block from "./Block";
import { ROWNUM, COLNUM, EXTRA_ROWNUM } from "../constants";
import { StyledField } from "../styles/StyledField";

export const createField = ({ rowNum, colNum}) => {
    return Array.from(Array(rowNum), () => new Array(colNum).fill([0, 'clear']))
};

const Field = ({ field }) => {
    return (
        <StyledField rownum={ROWNUM} colnum={COLNUM}>
            {
                field.map((row, y) => y >= EXTRA_ROWNUM && row.map((block, x) => <Block key={x} type={block[0]} />))
            }
        </StyledField>
    )
};

export default Field;
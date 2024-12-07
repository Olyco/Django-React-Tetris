import { memo } from "react";
import { TETROMINOS } from "../constants";
import { StyledBlock } from "../styles/StyledBlock";

const Block = ({ type }) => (
    <StyledBlock type={type} color={TETROMINOS[type].color} />
)

export default memo(Block);
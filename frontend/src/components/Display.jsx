import '../styles/Display.css'

const Display = ({name, text}) => (
    <div className="Display">
        <nobr><div className="Name">{name}:</div></nobr>
        <div className="Text">{text}</div>
    </div>
);

export default Display;
import { listaTaks } from "../../App";
import Card from "../Card/Card";
import "./Task.scss";
import immagine from "./trashcan.png";

function Task({ id, descrizione, data, fatto, onDelete, onComplete }) {
    var className = "descrizione";
    if (fatto) {
        className += " fatto";
    }

    const renderCheckbox = () => {
        if (fatto) {
            return <span className="check">✅</span>;
        }
        return null;
    };

    const checkbox = fatto ? <span className="check">✅</span> : null; //Renderizzazione condizionale: funziona come un ternario

    return (
        <Card className="task">
            <div className="left-area">
                <span className="data">{data.toString().substring(4, 21)}</span>
                <span className={className}>{descrizione}</span>
                {renderCheckbox()}
            </div>
            <div className="right-area">
                <input
                    type="checkbox"
                    checked={fatto}
                    onChange={() => {
                        onComplete(id, !fatto);
                    }}
                />
                <img
                    alt="delete"
                    src={immagine}
                    onClick={() => {
                        onDelete(id);
                    }}
                />
            </div>
        </Card>
    );
}

export default Task;

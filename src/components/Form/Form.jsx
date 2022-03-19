import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "../Card/Card";
import "./Form.scss";

function Form({ titolo, sottotitolo, onSubmit, children }) {
    // console.log(props);
    const [descrizione, setDescrizione] = useState("");
    const [mouseOver, setMouseOver] = useState(false);
    useEffect(() => {
        if (descrizione === "ciao" && mouseOver) {
            alert("Ciao a te!");
        }
    }, [descrizione, mouseOver]);
    return (
        <Card>
            <form
                className="input-form"
                onSubmit={(ev) => {
                    ev.preventDefault();
                    onSubmit({
                        id: uuidv4(), //permette di generare id casuali che saranno sicuramente univoci dopo aver importato all'inizio
                        descrizione: descrizione,
                        data: new Date(),
                        fatto: false,
                    });
                }}
            >
                <h3>{titolo}</h3>
                <label>{sottotitolo}</label>
                <input
                    className={mouseOver ? "mouse-over" : ""}
                    value={descrizione}
                    placeholder="Descrizione"
                    onMouseOver={() => {
                        console.log("mouse over");
                        setMouseOver(true);
                        // onMouse();
                    }}
                    onMouseOut={() => {
                        console.log("mouse out");
                        setMouseOver(false);
                    }}
                    onChange={(ev) => {
                        setDescrizione(ev.target.value);
                    }}
                />
                {children}
                <button type="submit" disabled={descrizione === ""}>
                    Aggiungi task
                </button>
            </form>
        </Card>
    );
}

export default Form;

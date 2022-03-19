import { useState, useEffect } from "react";
import "./App.scss";
import Card from "./components/Card/Card";
import Form from "./components/Form/Form";
import Task from "./components/Task/Task";

function App() {
    const [listaTask, setListaTask] = useState();
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        console.log("Inizializzazione valori lista task letti da localstorage");
        const lista = JSON.parse(localStorage.getItem("lista"));
        if (lista) {
            setListaTask(lista);
        }
    }, []);

    useEffect(() => {
        console.log("è cambiata la nostra lista");
        localStorage.setItem("lista", JSON.stringify(listaTask));
    }, [listaTask]);

    console.log("lista", listaTask);

    const onSubmit = (task) => {
        if (listaTask === undefined) {
            setListaTask([task]);
        } else {
            setListaTask([...listaTask, task]);
        }
    };

    const onDelete = (id) => {
        setListaTask(listaTask.filter((task) => task.id !== id));
        // alert('stai per cancellare il task ' + id)
    };

    const onComplete = (id, fatto) => {
        const lista = [...listaTask];
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].id === id) {
                lista[i].fatto = fatto;
            }
        }
        console.log(lista);
        setListaTask(lista);
    };

    function renderLista() {
        if (listaTask === undefined) {
            // L'utente deve ancora iniziare a usare la nostra todo list
            return (
                <Card>Per inserire il tuo primo task, usa la form sopra.</Card>
            );
        }
        if (listaTask.length === 0) {
            // L'utente ha cancellato tutti i task
            return <Card>Complimenti! Hai cancellato tutti i task</Card>;
        }
        return listaTask.map((task) => (
            <Task
                key={task.id}
                {...task}
                onDelete={onDelete}
                onComplete={onComplete}
            />
        ));
    }

    return (
        <div className="app">
            {listaTask && listaTask.length > 10 ? (
                <h4>Quanti task che hai!</h4>
            ) : null}
            <Form
                titolo="Inserisci un task"
                sottotitolo="Utilizza enter per aggiungere"
                onSubmit={onSubmit}
            >
                <p>ciao</p>
            </Form>

            <Form
                titolo="Filtra"
                onSubmit={(task) => {
                    console.log("voglio filtrare");
                    setFiltro(task.descrizione);
                }}
            >
                <p>ciao</p>
            </Form>
            {renderLista()/*richiamo funzione che permette di gestire i task*/}
        </div>
    );
}

export default App;

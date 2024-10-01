import CustomButton from "./components/CustomButton";
import Tooltip from "./components/Tooltip";

function App() {
  return (
    <div>
      <div>Hola</div>
      <CustomButton>Seleccione el botón</CustomButton>
      <div
        style={{
          marginTop: "2rem",
          width: "80%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Tooltip content="Esto es un tooltip" position="right">
          <button>Izquierda</button>
        </Tooltip>
        <Tooltip content="Esto es un tooltip" position="bottom">
          <button>Abajo</button>
        </Tooltip>
        <Tooltip content="Esto es un tooltip" position="top">
          <button>Arriba</button>
        </Tooltip>
        <Tooltip content="Esto es un tooltip" position="right">
          <button>Derecha</button>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;

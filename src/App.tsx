import CustomButton from "./components/CustomButton";
import Tooltip from "./components/Tooltip";

function App() {
  return (
    <div>
      <div>Hola</div>
      <CustomButton>Seleccione el botón</CustomButton>
      <div style={{ padding: "50px" }}>
        <Tooltip content="Esto es un tooltip">
          <button>Hover aquí</button>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;

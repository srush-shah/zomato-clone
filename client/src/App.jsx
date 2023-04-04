//HOC
import HomeLayoutHOC from "./HOC/Home.HOC";

//Components
import Temp from "./Components/Temp.component";

function App() {
  return (
    <>
      <HomeLayoutHOC path="/" exact element={<Temp />} />
    </>
  );
}

export default App;

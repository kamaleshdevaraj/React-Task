import { Suspense } from "react";
import "./App.css";
import Calendar from "./pages/calenderpage";

function App() {
  return (
    <Suspense fallback={true}>
      <Calendar />
    </Suspense>
  );
}

export default App;

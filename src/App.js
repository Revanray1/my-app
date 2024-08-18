import Home from "./components/Home"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateForm from "./components/CreateForm"
import ViewFrom from "./components/ViewFrom"

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form/:id" element={<CreateForm />} /> 
        <Route path="/view/:id" element={<ViewFrom />} /> 
    </Routes>
</Router>
  );
}

export default App;

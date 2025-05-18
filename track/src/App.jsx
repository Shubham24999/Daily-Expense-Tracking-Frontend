
import './App.css';
import Dashboard from './components/Dashboard';
import TopBar from './components/TopBar';
import ExpenseDetails from './components/ExpenseDetails';
import ExpenseDetailsNew from './components/ExpenseDetailsNew';

function App() {

  return (
    <div className="App">
      <TopBar />
      <Dashboard />
      <ExpenseDetailsNew />
      {/* <ExpenseDetails /> */}
    </div>
  );
}

export default App;

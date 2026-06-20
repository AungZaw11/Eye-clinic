import React, { useState, useEffect } from 'react'; // <--- ဒီလိုင်းက အဓိကပါ
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import PatientForm from './components/PatientForm';
import PatientTable from './components/PatientTable';
import DashboardSummary from './components/DashboardSummary';

function App() {
  const [patients, setPatients] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchPatients = async () => {
    const querySnapshot = await getDocs(collection(db, "patients"));
    setPatients(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchPatients();
  }, [refresh]);

  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-italic">For MaMa</h1>
          
        </div>
        
        <DashboardSummary />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <PatientForm onSave={() => setRefresh(!refresh)} />
          </div>
          <div className="md:col-span-2">
            <PatientTable 
              patients={patients} 
              refreshData={() => setRefresh(!refresh)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


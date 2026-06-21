import React, { useEffect, useState } from 'react';
import { db } from '../firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
// Icon များကို import လုပ်ခြင်း
import { CalendarDays, Users, History } from 'lucide-react';

const DashboardSummary = () => {
  const [stats, setStats] = useState({ today: 0, yesterday: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "patients"));
      const patients = querySnapshot.docs.map(doc => doc.data());

      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      setStats({
        today: patients.filter(p => p.date === today).length,
        yesterday: patients.filter(p => p.date === yesterday).length,
        total: patients.length
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-gray-500 p-4">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* ယနေ့လူနာ */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700 flex items-center gap-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300">
          <CalendarDays size={24} />
        </div>
        <div>
          <h3 className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">ယနေ့</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.today}</p>
        </div>
      </div>
      
      {/* မနေ့ကလူနာ */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700 flex items-center gap-4">
        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg text-purple-600 dark:text-purple-300">
          <History size={24} />
        </div>
        <div>
          <h3 className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">မနေ့က</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.yesterday}</p>
        </div>
      </div>

      {/* စုစုပေါင်း */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700 flex items-center gap-4">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg text-green-600 dark:text-green-300">
          <Users size={24} />
        </div>
        <div>
          <h3 className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">စုစုပေါင်း</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const DashboardSummary = () => {
  const [stats, setStats] = useState({ today: 0, yesterday: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "patients"));
      const patients = querySnapshot.docs.map(doc => doc.data());

      // ယနေ့နှင့် မနေ့က ရက်စွဲများ (YYYY-MM-DD format)
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

  if (loading) return <div className="text-gray-500 p-4">Loading stats...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700">
        <h3 className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">ယနေ့လူနာ</h3>
        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.today}</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700">
        <h3 className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">မနေ့ကလူနာ</h3>
        <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.yesterday}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700">
        <h3 className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">စုစုပေါင်းလူနာ</h3>
        <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.total}</p>
      </div>
    </div>
  );
};

export default DashboardSummary;
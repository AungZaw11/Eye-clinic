import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const PatientForm = ({ onSave }) => {
  // Initial state: ရက်စွဲကို ယနေ့နေ့စွဲဖြင့် စတင်သတ်မှတ်ထားသည်
  const [formData, setFormData] = useState({ 
    name: '', 
    type: 'Select option', 
    doctor: '', 
    date: new Date().toISOString().split('T')[0],
    eye: 'Both',
    reference : ''

  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Firebase "patients" collection ထဲသို့ အချက်အလက်များ သိမ်းဆည်းခြင်း
      await addDoc(collection(db, "patients"), formData);
      
      // သိမ်းဆည်းပြီးပါက Form ကို ပြန်လည်ရှင်းလင်းခြင်း
      setFormData({ 
        name: '', 
        type: 'Macula', 
        doctor: '', 
        date: new Date().toISOString().split('T')[0] 
      });
      
      // Table ပြန်လည် Refresh ဖြစ်စေရန် onSave ကို ခေါ်ခြင်း
      if (onSave) onSave();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error saving data. Please check your connection.");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700 transition-colors duration-300"
    >
      <h2 className="text-xl font-bold mb-4 dark:text-white">လူနာအသစ်ထည့်ရန်</h2>
      
      {/* နာမည် */}
      <input 
        type="text"
        className="w-full border p-2 mb-3 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" 
        placeholder="လူနာနာမည်" 
        value={formData.name} 
        onChange={(e) => setFormData({...formData, name: e.target.value})} 
        required
      />

      {/* အမျိုးအစား */}
      <select 
        className="w-full border p-2 mb-3 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        value={formData.type}
        onChange={(e) => setFormData({...formData, type: e.target.value})}
      >
        <option value="Select option">Select option</option>
        <option value="Macula">Macula</option>
        <option value="Cornea">Cornea</option>
        <option value="Glaucoma">Glaucoma</option>
        <option value="Retina">Retina</option>
        

      </select>

      {/* ဆရာဝန်အမည် */}
      <input 
        type="text"
        className="w-full border p-2 mb-3 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" 
        placeholder="ဆရာဝန်အမည်" 
        value={formData.doctor} 
        onChange={(e) => setFormData({...formData, doctor: e.target.value})}
        required
      />

      {/* ရက်စွဲ */}
      <input 
        type="date"
        className="w-full border p-2 mb-4 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        value={formData.date}
        onChange={(e) => setFormData({...formData, date: e.target.value})}
        required
      />
    <select 
  className="w-full border p-2 mb-3 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
  value={formData.eye}
  onChange={(e) => setFormData({...formData, eye: e.target.value})}
>
    <option value="Both">Both Eyes</option>
  <option value="Left">Left Eye</option>
  <option value="Right">Right Eye</option>
 
</select>

<input 
  type="text"
  className="w-full border p-2 mb-3 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" 
  placeholder="Reference (ဘယ်သူလွှဲလိုက်သလဲ)" 
  value={formData.reference} 
  onChange={(e) => setFormData({...formData, reference: e.target.value})} 
/>
      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-colors"
      >
        သိမ်းမည်
      </button>
    </form>
  );
};

export default PatientForm;
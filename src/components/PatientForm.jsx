import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
// Icons များ Import လုပ်ခြင်း
import { User, Stethoscope, Calendar, Eye, FileText, ChevronDown, UserCheck } from 'lucide-react';

const PatientForm = ({ onSave }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    type: '', 
    doctor: '', 
    servicedBy: '',
    date: new Date().toISOString().split('T')[0],
    eye: 'Both',
    reference: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "patients"), formData);
      setFormData({ 
        name: '', type: '', doctor: '', servicedBy: '', 
        date: new Date().toISOString().split('T')[0], eye: 'Both', reference: '' 
      });
      if (onSave) onSave();
      alert("လူနာမှတ်တမ်း အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ။");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error saving data. Please check your connection.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2">
        <UserCheck className="text-blue-500" /> လူနာအသစ်ထည့်ရန်
      </h2>
      
      {/* နာမည် */}
      <div className="relative mb-3">
        <User className="absolute left-3 top-3 text-gray-400" size={18} />
        <input 
          className="w-full border p-2 pl-10 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600" 
          placeholder="လူနာနာမည်" value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})} required
        />
      </div>
        {/* အမျိုးအစား */}
    <div className="relative mb-3">
    <select 
  className="w-full border p-2 pl-10 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 appearance-none"
  value={formData.type} 
  onChange={(e) => setFormData({...formData, type: e.target.value})}
>
  <option value="">အမျိုးအစား ရွေးချယ်ပါ</option>
  
  <optgroup label="Investigations">
    <option value="Macula">Macula</option>
    <option value="ONH">ONH</option>
    <option value="GCC">GCC</option>
    <option value="Fov">Fov</option>
    <option value="IOL Master">IOL Master</option>
    <option value="B-scan">B-scan</option>
    <option value="Lasik Pretest">Lasik Pretest</option>
    <option value="Fundus Photo">Fundus Photo</option>
  </optgroup>
  
  <optgroup label="Procedures">
    <option value="Glucoma Pg">Glucoma Pg</option>
    <option value="Yag Laser">Yag Laser</option>
    <option value="PI laser">PI laser</option>
    <option value="PRP laser">PRP laser</option>
    <option value="Focal laser">Focal laser</option>
    <option value="PRP topping up laser">PRP topping up laser</option>
    <option value="SLT laser">SLT laser</option>
    <option value="SL laser">SL laser</option>
  </optgroup>
</select>
</div>
      {/* ဆရာဝန်နှင့် လုပ်ဆောင်ပေးသူ */}
      <div className="flex gap-2">
        <input className="w-full border p-2 mb-3 rounded dark:bg-gray-700 dark:text-white" placeholder="ဆရာဝန်" value={formData.doctor} onChange={(e) => setFormData({...formData, doctor: e.target.value})} required />
        <input className="w-full border p-2 mb-3 rounded dark:bg-gray-700 dark:text-white" placeholder="လုပ်ဆောင်သူ" value={formData.servicedBy} onChange={(e) => setFormData({...formData, servicedBy: e.target.value})} />
      </div>

      {/* ရက်စွဲ (သီးသန့် Row ဖြစ်စေရန်) */}
<div className="relative mb-3 w-full">
  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
  <input 
    type="date" 
    className="w-full border p-3 pl-10 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" 
    value={formData.date} 
    onChange={(e) => setFormData({...formData, date: e.target.value})} 
    required 
  />
</div>

      {/* မျက်လုံး နှင့် Reference */}
      <div className="flex gap-2 mb-4">
        <div className="relative w-1/2">
           <Eye className="absolute left-3 top-3 text-gray-400" size={18} />
           <select className="w-full border p-2 pl-10 rounded dark:bg-gray-700 dark:text-white" value={formData.eye} onChange={(e) => setFormData({...formData, eye: e.target.value})}>
             <option value="Both">Both</option><option value="Left">Left</option><option value="Right">Right</option>
           </select>
        </div>
        <input className="w-full border p-2 rounded dark:bg-gray-700 dark:text-white" placeholder="Reference" value={formData.reference} onChange={(e) => setFormData({...formData, reference: e.target.value})} />
      </div>

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-colors">
        သိမ်းမည်
      </button>
    </form>
  );
};

export default PatientForm;
import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig'; // သင့်ဖိုင်နာမည်အတိုင်း သေချာစစ်ပါ
import * as XLSX from 'xlsx';

const PatientTable = ({ patients, refreshData }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = async (id) => {
    if (window.confirm("ဖျက်မှာသေချာပါသလား?")) {
      await deleteDoc(doc(db, "patients", id));
      refreshData();
    }
  };

  const exportToExcel = () => {
    // အသစ်ဆုံးကို ထိပ်တင်ပြီးမှ Excel Export ထုတ်ခြင်း
    const sortedData = [...patients].sort((a, b) => new Date(b.date) - new Date(a.date));
    const worksheet = XLSX.utils.json_to_sheet(sortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
    XLSX.writeFile(workbook, "PatientData.xlsx");
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditData(p);
  };

  const saveEdit = async (id) => {
    await updateDoc(doc(db, "patients", id), editData);
    setEditingId(null);
    refreshData();
  };

  return (
    <div className="space-y-4">
      {/* Excel Export Button */}
      <div className="flex justify-end">
        <button 
          onClick={exportToExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Export to Excel 📥
        </button>
      </div>

      {/* Sorting: Date အသစ်ဆုံးကို ထိပ်ဆုံးတင်ပြသခြင်း */}
      {[...patients]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((p) => (
        <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border dark:border-gray-700">
          {editingId === p.id ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="bg-gray-100 dark:bg-gray-700 p-2 rounded" value={editData.name || ""} onChange={e => setEditData({...editData, name: e.target.value})} placeholder="နာမည်" />
              <input className="bg-gray-100 dark:bg-gray-700 p-2 rounded" value={editData.type || ""} onChange={e => setEditData({...editData, type: e.target.value})} placeholder="အမျိုးအစား" />
              <input className="bg-gray-100 dark:bg-gray-700 p-2 rounded" value={editData.doctor || ""} onChange={e => setEditData({...editData, doctor: e.target.value})} placeholder="ဆရာဝန်" />
              <input type="date" className="bg-gray-100 dark:bg-gray-700 p-2 rounded" value={editData.date || ""} onChange={e => setEditData({...editData, date: e.target.value})} />
              <select className="bg-gray-100 dark:bg-gray-700 p-2 rounded" value={editData.eye || ""} onChange={e => setEditData({...editData, eye: e.target.value})}>
                <option value="Left Eye">Left Eye</option>
                <option value="Right Eye">Right Eye</option>
                <option value="Both">Both</option>
              </select>
              <input className="bg-gray-100 dark:bg-gray-700 p-2 rounded" value={editData.reference || ""} onChange={e => setEditData({...editData, reference: e.target.value})} placeholder="Reference" />
              
              <div className="md:col-span-2 flex gap-2">
                <button onClick={() => saveEdit(p.id)} className="flex-1 bg-green-500 text-white p-2 rounded">Save</button>
                <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-500 text-white p-2 rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg dark:text-white">{p.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{p.type} • {p.doctor}</p>
                <p className="text-xs mt-1 dark:text-gray-300">ရက်စွဲ: {p.date} • မျက်လုံး: {p.eye}</p>
                <p className="text-xs text-blue-500">Ref: {p.reference}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => startEdit(p)} className="text-blue-500 text-sm hover:underline">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-500 text-sm hover:underline">Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientTable;
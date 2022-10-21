import React from "react";

function SecondStage(props: any) {
  const allRotab = props.rotab;
  const allAsakfa = props.asakfa;
  const allChurch = props.churches;
  return (
    <div className="flex flex-col justify-center space-y-10 align-middle">
      <h1 className="text-2xl">برجاء ادخال بيانات الشماس</h1>
      <div className="flex flex-row space-x-8">
        <select className="w-1/2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          {allRotab.map((rotab: any) => (
            <option key={rotab.id} value={rotab.id}>
              {rotab.name}
            </option>
          ))}
        </select>
        <label>رتبة الشماس</label>
      </div>
      <div className="flex flex-row space-x-8">
        <select className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          {allAsakfa.map((asakfa: any) => (
            <option key={asakfa.id} value={asakfa.id}>
              {asakfa.name}
            </option>
          ))}
        </select>
        <label>اسم أسقف الرسامة</label>
      </div>
      <div className="flex flex-row space-x-8">
        <input
          className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="date"
        />

        <label>سنة الرسامة</label>
      </div>
      <div className="flex flex-row space-x-8">
        <select className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          {allChurch.map((church: any) => (
            <option key={church.id} value={church.id}>
              {church.name}
            </option>
          ))}
        </select>
        <label>اسم الكنيسة</label>
      </div>
      <button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        التالي
      </button>
    </div>
  );
}

export default SecondStage;

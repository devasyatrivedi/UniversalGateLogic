import React from 'react';
import { TruthTableData } from '@/lib/gateLogic';

interface TruthTableProps {
  data: TruthTableData;
}

const TruthTable: React.FC<TruthTableProps> = ({ data }) => {
  const { headers, rows } = data;
  
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-blue-100">
          {headers.map((header, index) => (
            <th key={index} className="border border-gray-300 px-4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td 
                key={cellIndex} 
                className={`border border-gray-300 px-4 py-2 text-center ${
                  cell === 1 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TruthTable;

import React from 'react';

const SuccessCardTenWord = ({ data }) => {
  return (
    <div className="relative h-full w-full overflow-x-auto items-center gap-3">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.result?.map((item, index) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.timeTaken.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className="w-full text-center text-2xl text-white"
        style={{
          background: 'rgb(17, 24, 39)',
        }}
      >
        {data?.totalTime?.toFixed(2)}
      </div>
    </div>
  );
};

export default SuccessCardTenWord;

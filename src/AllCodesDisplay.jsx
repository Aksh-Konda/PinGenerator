import React from 'react';

function AllCodesDisplay({ codes }) {
  const formatDate = (date) => {
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use 12-hour format
    };

    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedTime = formattedDate.slice(-7); // Extract time portion (e.g., "5:50 PM")

    const day = formattedDate.slice(0, formattedDate.indexOf(',')); // Extract day (e.g., "19th")
    const month = formattedDate.slice(
      formattedDate.indexOf(',') + 2,
      formattedDate.indexOf(' ')
    ); // Extract month (e.g., "Jan")

    return `${day} ${month}, ${formattedTime}`;
  };

  const renderCodes = () => {
    if(codes.length === 0) return null;
    return (
      <div class="relative overflow-y-auto border m-1 shadow-md sm:rounded-lg">
        <ul class="rounded-md w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {codes.toReversed().map((code) => {
            return (
              <li
                key={code.code}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between"
              >
                <div
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {code.code}
                </div>
                <div class="px-6 py-4">
                  {formatDate(new Date(code.dateTime))}
                </div>
                <div class="px-6 py-4 text-right">
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText(code.code);
                    }}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                  >
                    Copy
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="text-center bg-white grow h-full w-full rounded-lg flex flex-col px-2 pb-2 overflow-y-auto">
      <h1 className="mt-3 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        All Codes
      </h1>

      <div className="h-full w-full bg-gray-300 flex flex-col rounded-md overflow-y-auto">
        {renderCodes()}
      </div>
    </div>
  );
}

export default AllCodesDisplay;

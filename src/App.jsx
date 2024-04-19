import { useState, useEffect  } from 'react';

import CodeDisplay from './CodeDisplay';
import AllCodesDisplay from './AllCodesDisplay';

const LOCAL_STORAGE_KEY = 'CodeGeneratorKey';

function App() {
  const [codes, setCodes] = useState([]);
  const [currentCode, setCurrentCode] = useState(1234);

  useEffect(() => {
    const latestCodes = getLatestCodes() || [];
    setCodes(latestCodes);
    if (latestCodes.length > 0)
      setCurrentCode(latestCodes[latestCodes.length - 1].code);

    const destruct = setInterval(() => {
      setCodes(getLatestCodes());
    }, 2000);
  }, []);

  useEffect(() => {
    saveLatestCodes(getUniqCodes([...codes]));
    setCurrentCode(codes.length > 0 ? codes[codes.length - 1].code : 1234);
  }, [codes]);

  const handleGenerate = () => {
    const latestCodes = new Set(getLatestCodes().map((code) => code.code));
    let newCode = getRandomCode();

    console.log('code generator activated');

    while (latestCodes.has(newCode)) {
      newCode = getRandomCode();
    }

    console.log(newCode);

    setCodes((currCodes) =>
      getUniqCodes([...currCodes, { code: newCode, dateTime: new Date() }])
    );
  };

  const getRandomCode = () => {
    return Math.floor(Math.random() * 9000 + 1000);
  };

  const getLatestCodes = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return [];

    return JSON.parse(data);
  };

  const saveLatestCodes = (codes) => {
    const data = JSON.stringify(codes);
    localStorage.setItem(LOCAL_STORAGE_KEY, data);
  };

  const getUniqCodes = (codes) => {
    const result = new Set(codes, {
      // Custom comparison function to check object property values for equality
      equals(code1, code2) {
        return code1.code === code2.code;
      },
    });

    return [...result];
  };

  return (
    <div className="absolute inset-0 bg-gray-800 flex flex-col justify-center items-center px-2 py-3">
      <CodeDisplay code={currentCode} />

      <button
        type="button"
        onClick={handleGenerate}
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
      >
        Generate Code
      </button>

      <button
        onClick={() => {
          navigator.clipboard.writeText(currentCode);
        }}
        type="button"
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
      >
        Copy Latest Code
      </button>

      <AllCodesDisplay codes={codes} />
    </div>
  );
}

export default App;
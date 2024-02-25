// Table.js
import React from 'react';

const Table = ({ children, className }) => {
  return (
    <table className={` p-12  w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ${className}`}>
      {children}
    </table>
  );
};

export default Table;

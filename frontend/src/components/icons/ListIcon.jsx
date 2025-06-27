import React from 'react';

const ListIcon = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
    <img
      src="data:image/png;base64,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"
      alt="list"
    />
    <p className='font-bold text-gray-600'>List Your Donations</p>
    </div>
  );
};

export default ListIcon;

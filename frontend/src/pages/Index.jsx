import React from 'react';
import Header from './Header';

function Index() {
  return (
    <div>
      <Header />
      {/* <h1>Welcome to Task Tracker</h1> */}
      <div className='mt8'>
        <h1 style={{ color: 'Blue', textAlign: 'center', marginTop: '200px' }}>
          Welcome to Task Tracker!
        </h1>
      </div>
    </div>
  );
}

export default Index;

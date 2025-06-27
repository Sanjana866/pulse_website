import react from 'react';
import Comingsoon from '../components/icons/Comingsoon'
const Contact=()=>{
    return(
        <div className='min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center space-y-16'>
            <Comingsoon/>
            <h1 className='text-3xl font-bold md:text-5xl'>Coming Soon...</h1>
        </div>
    );
};

export default Contact;
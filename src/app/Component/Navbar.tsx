import Image from 'next/image';
import Logo from '@/assets/logo-icon.png'

const Navbar = () => {

    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    });
    return (
        <div className='flex justify-between items-center px-4 py-2'>
            <div className='flex items-center gap-2'>
            <Image src={Logo} alt="Logo" width={30} height={30} className='border bg-[#05893E] rounded-[5px] p-2' />
            <div>
                <h2 className='font-bold text-xl'>বাজার দর</h2>
                <p className='text-[12px]'>{date}</p>
            </div>
            </div>
            <div className='flex gap-2'>
                <button className='text-sm'>Sign In</button>
                <button className='btn bg-[#05893E] text-white rounded-[7px] text-sm '>Sign up</button>
            </div>
        </div>
    );
};

export default Navbar;
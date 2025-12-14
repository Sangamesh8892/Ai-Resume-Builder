import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gradient-to-b from-white to-[#F1EAFF]'>
 <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <footer className="flex flex-col md:flex-row items-center justify-around w-full text-sm text-gray-800/70 gap-4 md:gap-0 py-4">
                <div className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
                    <a href="#" className="font-medium text-gray-500 hover:text-black transition-all">
                        Home
                    </a>
                    <a href="#cta" className="font-medium text-gray-500 hover:text-black transition-all">
                        Contact
                    </a>
                    <a href="#features" className="font-medium text-gray-500 hover:text-black transition-all">
                        Features
                    </a>
                </div>
                <div className="flex items-center gap-3 md:gap-8 text-indigo-500">
                    <a href="https://www.linkedin.com/in/sangameshwar-jalihal/" className="hover:-translate-y-0.5 hover:bg-indigo-100 p-2 rounded-xl transition-all duration-300 flex justify-center gap-2 md:gap-3"> <span className='mt-1 text-xs md:text-sm text-gray-800/70 whitespace-nowrap'>LinkedIn</span> 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="https://github.com/Sangamesh8892" className="hover:-translate-y-0.5 hover:bg-indigo-100 p-2 rounded-xl transition-all duration-300 flex gap-2 md:gap-4"> <span className='mt-1 text-xs md:text-sm text-gray-800/70 whitespace-nowrap'>Github</span> 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 18c-4.51 2-5-2-7-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

            </footer>
            <p className="mt-2 text-center pb-4 text-sm text-gray-800/70 px-4">Copyright © 2025 <a href="https://github.com/sangamesh8892">Sangamesh8892</a>. All rights reservered.</p>
    </div>
  )
}

export default Footer
import React from 'react';

const cards = [
  {
    id: 1,
    title: 'Mastering the Art of Capsule Wardrobes',
    subtitle: 'Timeless Elegance',
    date: '12th August 2022',
    imageUrl:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Unveiling the Hottest Beachwear Trends',
    subtitle: 'Summer Breeze',
    date: '18th January 2023',
    imageUrl:
      'https://images.unsplash.com/photo-1700159017572-de76bb0c5719?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: "Navigating the World of Women's Tailoring",
    subtitle: 'Power Dressing',
    date: '5th January 2025',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1682142715511-27bfbfdc044f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    title: "The World's Best Fashion Fair 2025",
    subtitle: 'New York Times',
    date: '25th May 2025',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1713720663924-4e3fe8f20f79?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const Blogs = () => {
  return (
    <div className='w-full pb-30 max-w-[1260px] mx-auto px-4'>
      <div className='flex justify-center text-center'>
        <div className='px-4 md:px-10 flex flex-col justify-center w-full'>
          <h1 className='text-2xl md:text-3xl pt-10 font-[990]'>Latest From Blog</h1>
          <p className='w-full md:w-[600px] py-5 text-zinc-600 mx-auto'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, debitis.
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5'>
            {cards.map((item, index) => (
              <div
                key={index}
                className='bg-white text-center rounded-2xl shadow-lg p-4 transition-transform hover:scale-105'
              >
                <div className='relative w-full h-[200px] mb-4'>
                  <img
                    className='w-full h-full object-cover rounded-lg'
                    src={item.imageUrl}
                    alt={item.title}
                  />
                </div>
                <h1 className='font-semibold text-red-500 mb-1'>{item.subtitle}</h1>
                <h1 className='font-bold mb-1 px-4'>{item.title}</h1>
                <p className='font-semibold text-lg mb-2'>{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

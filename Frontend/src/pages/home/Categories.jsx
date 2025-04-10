import React from 'react';
import { Link } from 'react-router-dom'
import img1 from "/src/assets/images/img1.jpg"
import img2 from "/src/assets/images/img2.jpg"
import img3 from "/src/assets/images/img3.jpg"
import img4 from "/src/assets/images/img4.jpg"

const Categories = () => {
  const categories = [
    {
      name: "Accessories",
      url: img1,
      link: "accessories"
    },
    {
      name: "Dress Collection",
      url: img2,
      link: "dress"
    },
    {
      name: "Jewellery",
      url: img3,
      link: "jewellery"
    },
    {
      name: "Cosmetics",
      url: img4,
      link: "cosmetics"
    }
  ]

  return (
    <div className='w-full max-w-[1260px] my-25 mx-auto px-4'>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5'>
        {categories.map((item, index) => (
          <div key={index} className='text-center overflow-hidden'>
            <Link to={`/categories/${item.link}`}>
              <img 
                src={item.url} 
                className='w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-full mx-auto mb-2 transition-transform duration-300 hover:scale-105' 
                alt={item.name} 
              />
              <h1 className='text-base sm:text-lg font-semibold'>{item.name}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories;

import React from 'react'
import Banner from "./Banner";
import Categories from "./Categories";
import HeroSection from "./HeroSection";
import TrendingProducts from '../../shop/TrendingProducts';
import DealsSection from './DealsSection';
import PromoBanner from "./PromoBanner"
import Blogs from "../blogs/blogs"

const home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <HeroSection/>
      <TrendingProducts/>
      <DealsSection/>
      <PromoBanner/>
      <Blogs/>
    </div>
  )
}

export default home
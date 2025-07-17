import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Seo from '../components/seo/Seo'

function Home() {
  return (
    <> 
      <Seo title="Devsernal" description="Let AI guide you to your next development tech stack. Discover tools, frameworks, and libraries tailored to your workflow." />
      <div className="h-[90vh] flex flex-col justify-center items-center">
        <HeroSection />
      </div>
    </>

  )
}

export default Home
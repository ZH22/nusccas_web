"use client"
import RotatingText from "../textAnimations/RotatingText/RotatingText"

export default function DyanmicHeroTitle(){
  return (

    <h1 className="text-4xl font-bold z-2">Discover Your Next 
      <span className="inline-block md:block mx-3 md:mx-0">
        <RotatingText
          texts={['CCA!', 'Event!', 'Adventure!']}
          mainClassName="px-2 sm:px-2 md:px-3 bg-blue-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />   
      </span> 
    
    
    on Campus!</h1>

    
  )
}
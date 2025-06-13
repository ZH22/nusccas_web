"use client"

import Stepper, { Step } from '@/components/reactBitsComponents/Stepper/Stepper';
import { useState } from 'react';
import { Combobox } from '@/components/combo-box';
import { Input } from '@/components/ui/input';

export default function OnboardStepper() {

  const [name, setName] = useState("testUser");

  const frameworks = [
    {
      value: "computer_science",
      label: "Computer Science",
    },
    {
      value: "life_science",
      label: "Life Science",
    },
    {
      value: "business",
      label: "Business",
    },
  ]

  return(
    <Stepper
      initialStep={1}
      onStepChange={(step) => {
        console.log(step);
      }}
      onFinalStepCompleted={() => console.log("All steps completed!")}
      backButtonText = "Prev"
      // backButtonProps={{ className: "cursor-pointer" }}
      nextButtonText = "Next"
      // nextButtonProps={{ className: "cursor-pointer "}}
    >
      <Step>
        <h2 className='text-4xl font-bold'>Welcome to NusCCAs! </h2>
        <br />
        <p>Let's Find out more about you</p>
      </Step>

      <Step>
        <h2 className='text-2xl font-bold'>What's your major?</h2>
        <br />
        {/* May need to lift state up to parent to allow for persistence */}
        <Combobox items={frameworks}/>
      </Step>

      <Step>
        <h2>Step 2</h2>
        <img style={{ height: '100px', width: '100%', objectFit: 'cover', objectPosition: 'center -70px', borderRadius: '15px', marginTop: '1em' }} src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894" />
        <p>Meow</p>
      </Step>

      <Step>
        <h2>Example Input</h2>
        <br/>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name?" />
      </Step>

      <Step>
        <h2 className='text-2xl font-bold'>Final Step</h2>
        <br/>
        <p>Now I know a little more about you! Thank you!</p>
        <p className='font-light italic text-gray-400'>Press Complete to Submit Changes</p>
      </Step>

      {/* onFinalStepCompleted => Callback fired after user finishes the final Step */}
    </Stepper>
  )
}
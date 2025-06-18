
// Custom Container component to ensure consistent layout gap

export default function Container({children,}: 
  Readonly<{children: React.ReactNode;}>)
{ 
return (
  <div className="m-auto md:w-4/5 md:my-8">
    {children}  
  </div>
)

}

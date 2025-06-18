
// Custom Container component to ensure consistent layout gap

export default function Container({children, className}: 
  Readonly<{children: React.ReactNode, className?: string}>)
{ 
return (
  <div className={`m-auto md:w-4/5 md:my-8 ${className}`}>
    {children}  
  </div>
)

}

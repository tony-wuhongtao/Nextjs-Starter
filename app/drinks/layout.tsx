
const DrinksLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="w-auto">
      <div className="mockup-code mb-8 p-3">
        <code>fetch data from https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a</code>
      </div>

      {children}
    
    </div>
  )
}

export default DrinksLayout
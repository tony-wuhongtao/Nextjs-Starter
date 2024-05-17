import Link from "next/link"
import Image from "next/image"

type Drink = {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  }


  const DrinksList = ({drinks}:{drinks: Drink[]}) => {
  return (
    // <ul className="menu menu-vertical pl-0">
    //     {drinks.map((drink)=>{

    //         return (
    //             <li key={drink.idDrink}>
    //                 <Link href={`/drinks/${drink.idDrink}`} className="text-xl font-medium">
    //                     {drink.strDrink}    
    //                 </Link>        
    //             </li>
    //         )
    //     })}
    // </ul>
    <ul className="grid sm:grid-cols-3 gap-6 mt-6">
        {drinks.map((drink)=>{
            return (
                <li key={drink.idDrink}>
                    <Link href={`/drinks/${drink.idDrink}`} className="text-xl font-medium">
                        <div className="relative h-80 mb-4">
                            <Image 
                                src={drink.strDrinkThumb} 
                                fill 
                                sizes='(min-witdh:200px) 50vw, 100vw' 
                                alt={drink.strDrink} 
                            className="rounded-md object-cover:"/>

                        </div>
                        {drink.strDrink}    
                    </Link>        
                </li>
            )
        })}
    </ul>

        
  )
}



export default DrinksList
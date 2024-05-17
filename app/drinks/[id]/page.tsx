import Link from "next/link"
import Image from "next/image";
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='


const getSingleDrink = async (id: string) => {
  const res = await fetch(`${url}${id}`)
  if (!res.ok){
    throw new Error('Could not fetch the drink data')
  }

  const data = await res.json()
  return data
};


const SingleDrinkPage = async ({params}:{params:{id:string}}) => {

  const data = await getSingleDrink(params.id);
//   console.log(data)
  const title = data?.drinks[0]?.strDrink
  const imgSrc = data?.drinks[0]?.strDrinkThumb
  const instructions = data?.drinks[0]?.strInstructions
//   console.log(title, imgSrc)
  return (
    <div>
        <Link href='/drinks' className='btn btn-primary mt-8 mb-12'>
            Back to Drinks
        </Link>
        {/* <h1>{title}</h1>
        <img src={imgSrc}/> */}
        <div className="card card-compact w-300 bg-base-100 shadow-xl">
            <figure><Image src={imgSrc} alt={title} width={400} height={400} className="w-f h-f rounded-md shadow-lg mb-4" priority/></figure>
            <div className="card-body m-2">
                <h2 className="card-title">{title}</h2>
                <p>{instructions}</p>
            </div>
        </div>
    </div>
  )
}

export default SingleDrinkPage
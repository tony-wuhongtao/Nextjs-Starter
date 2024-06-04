
const url = 'http://localhost:3000/api'
// const url = 'http://192.168.99.204:3000/api'


export default async function ProductsPage() {

    const getProducts = async () => {
        const res = await fetch(url,{next:{revalidate: 1}})
        return res.json();
    }

    const data = await getProducts();
  

  return (
    <>
        <h1>Products</h1>
        <ul className="grid grid-cols-4 gap-4 items-center">
            {
                data.products.map((item )=> (
                    <li className="w-52 mx-4" key={item.id}>
                        <img src={item.thumbnail} alt={item.title}/>
                        <div className="p-2 text-sm text-black bg-gray-400">
                            {item.title} <span className="rounded-lg p-1 px-1 ml-2 bg-gray-200">${item.price}</span>
                        </div>
                    </li>
                ))
            }
        </ul>
    </>
    
  )
}


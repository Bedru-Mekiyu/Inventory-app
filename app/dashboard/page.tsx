import ProductsChart from "@/components/products-chart";
import Sidebar from "@/components/sidebar"
import {getCurrentUser} from '@/lib/auth'
  import {prisma } from '@/lib/prisma'
import { promises } from "dns";
import { TrendingUp } from "lucide-react";

export default async function DashboardPage() {
 const user = await getCurrentUser();
const userId = user.id; 

const [totalProducts,lowStack,allProducts]=await Promise.all([ prisma.product.count({
  where: { userId }
}),
prisma.product.count({
  where:{
    userId,
    lowStackAt:{not:null},quantity:{lte:5},
  }
}),
prisma.product.findMany({
      where:{userId},
      select:{price:true,quantity:true,createdAt:true}
  })

])

 const inStackCount= allProducts.filter((p)=>Number(p.quantity)>5).length;
 const lowStackCount= allProducts.filter((p)=>Number(p.quantity)<=5 && Number(p.quantity)>=1).length;
  const outStackCount= allProducts.filter((p)=>Number(p.quantity)===0).length;

const inStackPercentage =
  totalProducts > 0 ? Math.round((inStackCount / totalProducts) * 100) : 0;

const lowStackPercentage =
  totalProducts > 0 ? Math.round((lowStackCount / totalProducts) * 100) : 0;

const outStackPercentage =
  totalProducts > 0 ? Math.round((outStackCount / totalProducts) * 100) : 0;



const now = Date()

const weeklyPoductsData=[]
for(let i=11; i >= 0;i--){
  const weekStart=new Date(now);
  weekStart.setDate(weekStart.getDate()-i*7);
  weekStart.setHours(0,0,0,0);

  const weekEnd=new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate()+6);
  weekEnd.setHours(23,59,59,999);
  const weekLabel=`${String(weekStart.getMonth()+1).padStart(2,"0")}/${String(weekStart.getDate()+1).padStart(2,"0")}`;
  const weekProducts=allProducts.filter((product)=>{
    const productDate=new Date(product.createdAt);
    return productDate >=weekStart && productDate <=weekEnd;
  });
  weeklyPoductsData.push({
    week:weekLabel,
    products:weekProducts.length,
  })

}

  const recent=await prisma.product.findMany({
  where:{userId},
  orderBy:{createdAt:'desc'},
  take:5
})
  const totalValue=allProducts.reduce((sum,product)=>sum+Number(product.price)*Number(product.quantity),0)
  
  return (
    <div className='min-h-screen bg-gray-50 '><Sidebar currentPath='/dashboard'/>
    <main className="ml-64 p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back! Here is overview of your inventory. </p>
          </div>
        </div>
      </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Key Metrics</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
           <div className="text-3xl font-bold text-gray-900">{totalProducts}</div>
           <div className="text-sm text-gray-600">Total Products</div>
           <div className="flex items-center justify-center mt-1">
            <span className="text-xs text-gray-600 ">+{totalProducts}</span> 
           <TrendingUp className="w-3 h-3 text-green-600 ml-1"/>
           </div>
          </div>
          <div className="text-center">
           <div className="text-3xl font-bold text-gray-900">${Number(totalValue).toFixed(0)}</div>
           <div className="text-sm text-gray-600">Total Value</div>
           <div className="flex items-center justify-center mt-1">
            <span className="text-xs text-gray-600 ">+{Number(totalValue).toFixed(0)}</span> 
           <TrendingUp className="w-3 h-3 text-green-600 ml-1"/>
           </div>
          </div>
          <div className="text-center">
           <div className="text-3xl font-bold text-gray-900">{lowStack}</div>
           <div className="text-sm text-gray-600">Low Stack</div>
           <div className="flex items-center justify-center mt-1">
            <span className="text-xs text-gray-600 ">+{lowStack}</span> 
           <TrendingUp className="w-3 h-3 text-green-600 ml-1"/>
           </div>
          </div>
          </div>
      </div>
       {/*inveroty over times */}
       <div className="bg-white rounded-lg border border-b-gray-200 p-6">
        <div className="flex items-center justify-between mb-6 ">
          <h2>New products per week</h2>
           </div>
           <div className="h-48">
            <ProductsChart data={weeklyPoductsData} />
           </div>
       </div>
    </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Stack Levels</h2>
          </div>
          <div className="space-y-3">
            {recent.map((product,key)=>{
              const stacklevel=product.quantity===0 ? 0: product.quantity<=(product.lowStackAt||5)? 1:2;

              const bgColors=['bg-red-600','bg-yellow-600','bg-green-600'] 
              const textColors=['text-red-600','text-yellow-600','text-green-600']

              return <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${bgColors[stacklevel]}`}/>
                  <span className="text-sm font-medium text-gray-900">{product.name}</span>
                </div>
                <div className={`text-sm font-medium ${textColors[stacklevel]}`}>{product.quantity} units</div>
                </div>
            })}
          </div>
        </div>
        {/*effeciency sec */}
        <div className="bg-white rounded-lg border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 ">Efficiency</h2>
          </div>
          <div className="flex items-center justify-center ">
             <div className="relative w-48 h-48 ">
               <div className="absolute inset-0 rounded-full border-8 border-gray-200 "></div>
               <div 
                className="absolute inset-0 rounded-full border-8 border-purple-600"
                style={{
                  clipPath:'polygon(50% 50%,50 0%, 100% 0% , 100% 100% ,0% 100%, 0% 50%)',
                }}
               />
                <div className="absolute inset-0 flex items-center justify-center ">
                  <div className="text-center">
                     <div className="text-2xl font-bold text-gray-900 ">{inStackPercentage}%</div>
                     <div className="text-sm text-gray-600">In Stack</div>
                  </div>
               </div>

             </div>
             </div>
             <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600 ">
                <div className=" flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-200"/>
                  <span>In Stack ({inStackPercentage}%)</span>
                </div>
                </div>
                 <div className="flex items-center justify-between text-sm text-gray-600 ">

                <div className=" flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600"/>
                  <span>Low Stack ({lowStackPercentage}%)</span>
                </div>
                </div>
                              <div className="flex items-center justify-between text-sm text-gray-600 ">

                <div className=" flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200"/>
                  <span>Out of Stack ({outStackPercentage}%)</span>
                </div>
              </div>
             </div>
        </div>

      </div>
    </main>
    </div>
    
  )
}




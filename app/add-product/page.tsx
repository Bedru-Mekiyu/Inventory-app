import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function AddProductPage() {
    const user=await getCurrentUser()
    return <div className="min-h-screen bg-gray-50">
        <Sidebar currentPath="/add-product"/>

        <main className="ml-64 p-8">
             <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
                    <p className="text-sm text-gray-500">Add a new Product to your inventory</p>
                    </div>
                </div>
            </div> 
            <div className="max-w-2xl">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <form action="" className="space-y-6 ">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                            <input type="text"  id="name" name="name" required className="w-full px-4 border border-gray-200 rounded-lg focus:border-transparent" placeholder="Enter Product name "/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                              <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                            <input min='0' type="number"  id="quantity" name="quantity" required className="w-full px-4 border border-gray-200 rounded-lg focus:border-transparent" placeholder="0"/>
                        </div>
                          <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price </label>
                            <input type="number" step='0.01' min='0' id="price" name="price" required className="w-full px-4 border border-gray-200 rounded-lg focus:border-transparent" placeholder="0.0"/>
                        </div>
                        </div>
                         <div>
                            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">SKU(optinal)*</label>
                            <input type="text"  id="sku" name="sku" required className="w-full px-4 border border-gray-200 rounded-lg focus:border-transparent" placeholder="Enter Sku"/>
                        </div>
                           <div>
                            <label htmlFor="lowStackAt" className="block text-sm font-medium text-gray-700 mb-2">Low StackAt(optinal) </label>
                            <input type="number"  min='0' id="lowStackAt" name="lowStackAt" required className="w-full px-4 border border-gray-200 rounded-lg focus:border-transparent" placeholder="Enter low Stack threshold"/>
                        </div>
                        <div className="flex gap-5 ">
                            <button type="submit" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add Product</button>
                            <Link href='/inventory' className="px-6 py-3 bg-gray-20000 text-gray-800 rounded-lg hover:bg-gray-300">cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
    
}
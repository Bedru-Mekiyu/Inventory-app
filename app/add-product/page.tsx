import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { createProduct } from "@/lib/products";
import Link from "next/link";

export const metadata = {
  title: "Add Product",
};

export default async function AddProductPage() {
  const user = await getCurrentUser();

  async function handleCreate(formData: FormData) {
    "use server";

    const name = String(formData.get("name") ?? "");
    const sku = String(formData.get("sku") ?? "");
    const price = Number(formData.get("price") ?? 0);
    const lowStackAt = Number(formData.get("lowStackAt") ?? 5);
    const quantity = Number(formData.get("quantity") ?? 0);

    await createProduct({
      userId: user.id,
      name,
      sku,
      price,
      lowStackAt,
      quantity,
    } as any);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="add-product" />
      <main className="ml-64 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Add Product
            </h1>
            <p className="text-sm text-gray-500">
              Add a new product to your inventory.
            </p>
          </div>
          <Link
            href="/inventory"
            className="text-sm text-indigo-600 hover:underline"
          >
            Back to inventory
          </Link>
        </div>

        <form
          className="bg-white rounded-lg border border-gray-200 p-6 space-y-4"
          action={handleCreate}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
              placeholder="Product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              SKU
            </label>
            <input
              name="sku"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
              placeholder="Optional SKU"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                min={0}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Low Stack At
              </label>
              <input
                name="lowStackAt"
                type="number"
                min={0}
                defaultValue={5}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                name="quantity"
                type="number"
                min={0}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Save product
          </button>
        </form>
      </main>
    </div>
  );
}

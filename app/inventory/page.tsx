import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/lib/products";
import Pagination from "@/components/pagination";
import Link from "next/link";

type SearchParams = {
  q?: string;
  page?: string;
};

type InventoryItem = {
  id: string;
  name: string;
  sku: string | null;
  price: unknown;
  lowStackAt: number | null;
  quantity: number;
};

export const metadata = {
  title: "Inventory",
};

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const user = await getCurrentUser();
  const userId = user.id;

  const params = await searchParams;
  const q = (params.q ?? "").trim();

  const where = {
    userId,
    ...(q
      ? {
          name: {
            contains: q,
            mode: "insensitive" as const,
          },
        }
      : {}),
  };

  const pageSize = 6;
  const page = Math.max(1, Number(params.page ?? 1));

  const [totalCount, itemsRaw] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        sku: true,
        price: true,
        lowStackAt: true,
        quantity: true,
      },
    }),
  ]);

  const items: InventoryItem[] = itemsRaw.map((p: InventoryItem) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    price: p.price,
    lowStackAt: p.lowStackAt,
    quantity: p.quantity,
  }));

  const totalPage = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="inventory" />
      <main className="ml-64 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
            <p className="text-sm text-gray-500">
              Manage your products and track inventory levels.
            </p>
          </div>
          <Link
            href="/add-product"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Add product
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <form className="mb-4 flex gap-3">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search products..."
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
            />
            <button
              type="submit"
              className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900"
            >
              Search
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500">Name</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Sku</th>
                  <th className="px-6 py-3 font-medium text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500">
                    Low Stack At
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500">
                    Quantity
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((product: InventoryItem) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {product.sku || "-"}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {product.lowStackAt ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      <form action={deleteProduct}>
                        <input
                          type="hidden"
                          name="id"
                          value={product.id}
                        />
                        <button
                          type="submit"
                          className="text-xs text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-sm text-gray-500 text-center"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <Pagination
              currentPage={page}
              totalPages={totalPage}
              baseUrl="/inventory"
              searchParams={{ q }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

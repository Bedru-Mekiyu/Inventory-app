import Sidebar from "@/components/sidebar";
import ProductsChart from "@/components/products-chart";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client"; // 👈 use Product type
import { TrendingUp } from "lucide-react";

type DashboardProduct = Pick<
  Product,
  "price" | "quantity" | "createdAt" | "lowStackAt"
>;

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user.id;

  const [totalProducts, lowStack, allProducts] = await Promise.all([
    prisma.product.count({
      where: { userId },
    }),
    prisma.product.count({
      where: {
        userId,
        lowStackAt: { not: null },
        quantity: { lte: 5 },
      },
    }),
    prisma.product.findMany({
      where: { userId },
      select: {
        price: true,
        quantity: true,
        createdAt: true,
        lowStackAt: true,
      },
    }),
  ]);

  const inStackCount = allProducts.filter(
    (p: DashboardProduct) => Number(p.quantity) > 5
  ).length;

  const lowStackCount = allProducts.filter(
    (p: DashboardProduct) =>
      Number(p.quantity) <= 5 && Number(p.quantity) >= 1
  ).length;

  const outStackCount = allProducts.filter(
    (p: DashboardProduct) => Number(p.quantity) === 0
  ).length;

  const inStackPercentage =
    totalProducts > 0 ? Math.round((inStackCount / totalProducts) * 100) : 0;

  const lowStackPercentage =
    totalProducts > 0 ? Math.round((lowStackCount / totalProducts) * 100) : 0;

  const outStackPercentage =
    totalProducts > 0 ? Math.round((outStackCount / totalProducts) * 100) : 0;

  const now = new Date();
  const weeklyPoductsData: { week: string; products: number }[] = [];

  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(weekStart.getDate()).padStart(2, "0")}`;

    const weekProducts = allProducts.filter((product: DashboardProduct) => {
      const productDate = new Date(product.createdAt);
      return productDate >= weekStart && productDate <= weekEnd;
    });

    weeklyPoductsData.push({
      week: weekLabel,
      products: weekProducts.length,
    });
  }

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const totalValue = allProducts.reduce(
    (sum: number, product: DashboardProduct) =>
      sum + Number(product.price) * Number(product.quantity),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="dashboard" />
      <main className="ml-64 p-8">
        {/* ...keep the same JSX for metrics, chart, recent products, etc. */}
      </main>
    </div>
  );
}

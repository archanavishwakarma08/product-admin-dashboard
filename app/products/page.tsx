import ProductsList from "@/components/products/ProductsList";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            Product Admin Dashboard
          </h1>

          <p className="mt-1 text-gray-600">
            Manage your products
          </p>
        </div>

        <ProductsList />
      </div>
    </main>
  );
}
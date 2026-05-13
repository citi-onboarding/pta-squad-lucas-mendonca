import Header from "@/components/Header";

export default function TestPage() {
  return (
    <div>
      <Header />
      <main style={{ padding: "2rem" }}>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Bem-vindo ao dashboard!</p>
      </main>
    </div>
  );
}
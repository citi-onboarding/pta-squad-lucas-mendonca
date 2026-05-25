import Header from "@/components/Header";
import RegisterBookForm from "@/components/registerBookForm";   

export default function RegisterBookPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-8">
        <RegisterBookForm />
      </main>
    </div>
  );
}
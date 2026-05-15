import Image from "next/image";
import { LogoCITi } from "../assets";
import { LoanStatusCard } from "../components/LoanStatusCard";
import { testLoans } from "../testeStatus";
import { BooksChart } from "@/components/BooksChart";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-black">
      <div className="w-full px-6">
        <BooksChart/>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-bold">NextJS Boilerplate</h1>
        <p className="text-white text-xl">
          Made with <strong>&lt; &#x0002F; &gt;</strong> and{" "}
          <strong>&hearts;</strong> by CITi
        </p>
      </div>
      <LoanStatusCard loans={testLoans} />
    </div>
  );
}

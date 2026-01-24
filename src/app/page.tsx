import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-4">
      <h1 className="text-2xl font-semibold text-white mb-8">Calculator</h1>
      <Calculator />
    </div>
  );
}

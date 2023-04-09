import Counter from "@/components/counter/Counter";

// const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <div>
      <Counter description="Our Counter" defaultCount={0} />
    </div>
  );
}

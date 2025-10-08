type buttonProps = { children: React.ReactNode };

export default function HeroButton({ children }: buttonProps) {
  return (
    <button className="min-w-40 rounded-md bg-gray-700 py-3 text-lg text-gray-300 transition-all hover:cursor-pointer active:bg-gray-700/50 active:text-gray-300/50">
      {children}
    </button>
  );
}

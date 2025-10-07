type buttonProps = { children: React.ReactNode };

export default function Button({ children }: buttonProps) {
  return (
    <button className="w-40 rounded-md bg-gray-700 py-3 text-lg text-gray-300 transition-all active:bg-gray-700/50 active:text-gray-300/50">
      {children}
    </button>
  );
}

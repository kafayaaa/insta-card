export default function Decoration() {
  return (
    <div className="w-full md:w-1/2 relative flex justify-center items-center">
      <div className="absolute top-0 left-0 size-20 md:size-40 rounded-full bg-brand-dark-purple -translate-y-1/2 translate-x-1/2 hover:scale-110 transition-all duration-300 ease-out"></div>
      <div className="absolute bottom-0 right-0 size-30 md:size-60 rounded-full bg-brand-light-lime translate-y-1/3 -translate-x-1/3 hover:scale-110 transition-all duration-300 ease-out"></div>
      <div className="w-40 md:w-80 h-48 md:h-96 bg-brand-white/20 border border-white/50 inset-shadow-xs inset-shadow-white shadow-md shadow-brand-light-purple/35 backdrop-blur-sm rounded-4xl"></div>
    </div>
  );
}

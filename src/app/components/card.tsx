
export default function ProductCard({ product, categoryName }: ProductCardProps) {
  return (
    <div className="bg-gray-100 w-2xs rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col transition-transform hover:scale-[1.02]">
      <div className="relative h-48 w-full bg-gray-200">
        <img 
          src={product.img} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        {categoryName && (
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            {categoryName}
          </span>
        )}
        
        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{product.description}</p>
        
        <button className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          Ver detalles
        </button>
      </div>
    </div>
  );
}
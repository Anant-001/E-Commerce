const categories = [
    { id: 1, name: "Phones", icon: "📱" },
    { id: 2, name: "Computers", icon: "💻" },
    { id: 3, name: "SmartWatch", icon: "⌚" },
    { id: 4, name: "Camera", icon: "📷" },
    { id: 5, name: "Headphones", icon: "🎧" },
    { id: 6, name: "Gaming", icon: "🎮" },
];

const Categories = () => {
    return (
        <section className="py-10 px-4 max-w-screen-xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📦 Browse by Category</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {categories.map((cat, index) => (
                    <div
                        key={cat.id}
                        className={`flex flex-col items-center justify-center border-2 rounded-lg p-4 cursor-pointer hover:border-red-500 transition `}
                    >
                        <div className="text-3xl mb-2">{cat.icon}</div>
                        <span className="text-sm font-medium">{cat.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;

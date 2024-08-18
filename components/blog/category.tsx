import categoryColorMap from "./category-colors";

export default function Category( {catergory}: { catergory: string} ) {

    return (
        <div className="flex justify-start">
            <div key={catergory}>
                <div className={`${categoryColorMap[catergory] || 'text-gray-500'} rounded-full py-1 px-2 text-sm`}>{catergory}</div>
            </div>
        </div>
    );
}

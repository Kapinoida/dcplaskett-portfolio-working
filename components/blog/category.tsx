export default function Category( {catergory}: { catergory: string} ) {
    const categoryColorMap : { [key: string]: string } = {
        'A Word.': 'bg-green-600',
        'Fiction.': 'bg-blue-500',
        'Technical.': 'bg-red-500',
    }

    return (
        <div className="flex justify-start">
            <div key={catergory}>
                <div className={`${categoryColorMap[catergory] || 'bg-gray-500'} rounded-full py-1 px-2 text-sm`}>{catergory}</div>
            </div>
        </div>
    );
}

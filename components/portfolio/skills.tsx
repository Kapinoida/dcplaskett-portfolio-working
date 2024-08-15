


export default function Skills( {skills}: { skills: string[]} ) {
    const skillColorMap : { [key: string]: string } = {
        'JavaScript.': 'bg-blue-500',
        'React.': 'bg-blue-500',
        'Python.': 'bg-green-500',
        'Selenium.': 'bg-green-500',
        'SQL.': 'bg-red-500',
        'NextJS.': 'bg-blue-500',
        'Tailwind.': 'bg-yellow-500',
        'CSS.': 'bg-yellow-500',
        'HTML.': 'bg-purple-500',
        'PHP.': 'bg-orange-500',
        'TypeScript.': 'bg-blue-500',
        'CMS.': 'bg-teal-500',
        'jQuery.': 'bg-blue-500',
    }

    return (
        <div className="flex flex-col items-center justify-start px-4">
            <p className="text-s font-bold text-center p-2">Skills</p>
            <div className="flex flex-wrap gap-4 justify-center">
                {skills.map((skill) => {
                    const color = skillColorMap[skill] || 'bg-gray-500'; // Default color if no mapping found
                    return (
                        <div key={skill}>
                            <div className={`${color} rounded-full py-1.5 px-4 text-sm`}>{skill}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

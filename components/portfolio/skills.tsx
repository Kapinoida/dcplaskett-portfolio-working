import skillColorMap from "./skills-colors";



export default function Skills( {skills}: { skills: string[]} ) {

    return (
        <div className="flex flex-col items-center justify-start md:px-4">
            <p className="text-s font-bold text-center md:p-2">Skills</p>
            <div className="flex flex-wrap md:gap-4 gap-1 justify-center max-w-full">
                {skills.map((skill) => {
                    const color = skillColorMap[skill] || 'text-gray-500'; // Default color if no mapping found
                    return (
                        <div key={skill}>
                            <div className={`${color} py-1.5 px-4 text-sm`}>{skill}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

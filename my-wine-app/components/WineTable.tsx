import React from 'react'
import { Wine } from '@/interfaces/interfaces'

interface WineTableProps {
    wines: Wine[]
}

const WineTable: React.FC<WineTableProps> = ({ wines }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Year
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Varietal
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Rating
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Consumed
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {wines.map((wine) => (
                        <tr key={wine.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {wine.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {wine.year}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {wine.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {wine.varietal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {wine.rating || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {wine.consumed ? 'Yes' : 'No'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WineTable
import React from 'react'

export interface TableColumn<T = any> {
  key: string
  header: string
  render: (item: T) => React.ReactNode
  className?: string
}

interface TableProps<T = any> {
  columns: TableColumn<T>[]
  data: T[]
  keyExtractor: (item: T) => string
  emptyMessage?: string
  className?: string
}

const Table = <T,>({ 
  columns, 
  data, 
  keyExtractor, 
  emptyMessage = "No data available",
  className = ""
}: TableProps<T>) => {
  return (
    <div className={`bg-white rounded-lg border border-pliant-sand/30 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-pliant-sand/30">
          
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-pliant-charcoal/60 uppercase tracking-wider ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-pliant-sand/30">
            {data.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => (
                  <td 
                    key={column.key} 
                    className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}
                  >
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-pliant-charcoal/60">{emptyMessage}</p>
        </div>
      )}
    </div>
  )
}

export default Table 
'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface Filters {
  search: string
  category: string
  minPrice: string
  maxPrice: string
  page: number
}

interface FilterSidebarProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
}

const categories = [
  'Electronics',
  'Clothing',
  'Accessories',
  'Shoes',
  'Home & Kitchen',
  'Books',
  'Sports',
  'Beauty'
]

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFilterChange({ [key]: value })
  }

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      page: 1
    }
    setLocalFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters = localFilters.category || localFilters.minPrice || localFilters.maxPrice

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value=""
              checked={localFilters.category === ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={localFilters.category === category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <label htmlFor="minPrice" className="block text-xs text-gray-600 mb-1">
              Min Price ($)
            </label>
            <input
              id="minPrice"
              type="number"
              min="0"
              step="0.01"
              value={localFilters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className="block text-xs text-gray-600 mb-1">
              Max Price ($)
            </label>
            <input
              id="maxPrice"
              type="number"
              min="0"
              step="0.01"
              value={localFilters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              placeholder="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Quick Price Filters */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Filters</h4>
        <div className="space-y-2">
          <button
            onClick={() => handleFilterChange('maxPrice', '50')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              localFilters.maxPrice === '50' && !localFilters.minPrice
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Under $50
          </button>
          <button
            onClick={() => {
              handleFilterChange('minPrice', '50')
              handleFilterChange('maxPrice', '100')
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              localFilters.minPrice === '50' && localFilters.maxPrice === '100'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            $50 - $100
          </button>
          <button
            onClick={() => {
              handleFilterChange('minPrice', '100')
              handleFilterChange('maxPrice', '200')
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              localFilters.minPrice === '100' && localFilters.maxPrice === '200'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            $100 - $200
          </button>
          <button
            onClick={() => handleFilterChange('minPrice', '200')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              localFilters.minPrice === '200' && !localFilters.maxPrice
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Over $200
          </button>
        </div>
      </div>
    </div>
  )
}

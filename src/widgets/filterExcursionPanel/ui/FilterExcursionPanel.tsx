import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FilterPanel } from '@/shared/ui/filterPanel'

export const FilterExcursionPanel = () => {
  return (
    <FilterPanel>
        <FilterPanel.SearchFilterComponent title='Поиск по стране'/>
    </FilterPanel>
  )
}

const styles = StyleSheet.create({})
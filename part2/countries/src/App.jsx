import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countriesService from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase()))
  const countriesLength = countriesToShow.length;

  useEffect(() => {
    countriesService.getAll().then(countries => {setCountries(countries)})
  }, [])

  const handleFilterValue = (event) => {
    setFilterValue(event.target.value)
  }

  return (
    <>
      <Filter value={filterValue} onChange={handleFilterValue}></Filter>
      <Countries countriesToShow={countriesToShow} countriesLength={countriesLength} setFilterValue={setFilterValue}></Countries>
    </>
  )
}

export default App
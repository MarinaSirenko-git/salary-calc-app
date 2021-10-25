import React, { useState } from 'react';
import './App.css';
import { timeData, minPerHour } from '../utils/consts';
import getTimeDifference from '../utils/utils';
import { ITimeData } from '../utils/interfaces';

function App() {
  const [data, setData] = useState(timeData)
  const [amount, setAmount] = useState(0);
  const [ratePerHour, setRatePerHour] = useState(0);

  const handleTimeInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.target as HTMLInputElement
    setData((data: ITimeData) => {
      return {
        ...data, 
        [name]: value
      }
    })
  }

  const handleRateInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.target as HTMLInputElement
    setRatePerHour(Number(value))
  }

  const handleBtnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const {
      arrivalValueMon, 
      arrivalValueThu, 
      arrivalValueWed, 
      arrivalValueTue, 
      arrivalValueFri,
      departureValueMon,
      departureValueThu,
      departureValueWed,
      departureValueTue,
      departureValueFri
    } = data

    const times = [
      getTimeDifference(arrivalValueMon, departureValueMon), 
      getTimeDifference(arrivalValueThu, departureValueThu),
      getTimeDifference(arrivalValueWed, departureValueWed),
      getTimeDifference(arrivalValueTue, departureValueTue),
      getTimeDifference(arrivalValueFri, departureValueFri)
    ]

    const amountOnHand = (times.reduce((prevValue, currValue) => prevValue + currValue)) * ratePerHour / minPerHour 
    setAmount(amountOnHand)
    setData(timeData)
  }

  return (
    <div className="App">
      <form onSubmit={handleBtnSubmit}>
        <fieldset>
          <legend>ставка за час</legend>
          <input type="text" value={ratePerHour} onChange={handleRateInputChange} />
        </fieldset>
        <fieldset>
          <legend>пн</legend>
          <input type="time" name="arrivalValueMon" value={data.arrivalValueMon} onChange={handleTimeInputChange} />
          <input type="time" name="departureValueMon" value={data.departureValueMon} onChange={handleTimeInputChange} />
        </fieldset>
        <fieldset>
          <legend>вт</legend>
          <input type="time" name="arrivalValueTue" value={data.arrivalValueTue} onChange={handleTimeInputChange} />
          <input type="time" name="departureValueTue" value={data.departureValueTue} onChange={handleTimeInputChange} />
        </fieldset>
        <fieldset>
          <legend>ср</legend>
          <input type="time" name="arrivalValueWed" value={data.arrivalValueWed} onChange={handleTimeInputChange} />
          <input type="time" name="departureValueWed" value={data.departureValueWed} onChange={handleTimeInputChange} />
        </fieldset>
        <fieldset>
          <legend>чт</legend>
          <input type="time" name="arrivalValueThu" value={data.arrivalValueThu} onChange={handleTimeInputChange} />
          <input type="time" name="departureValueThu" value={data.departureValueThu} onChange={handleTimeInputChange} />
        </fieldset>
        <fieldset>
          <legend>пт</legend>
          <input type="time" name="arrivalValueFri" value={data.arrivalValueFri} onChange={handleTimeInputChange} />
          <input type="time" name="departureValueFri" value={data.departureValueFri} onChange={handleTimeInputChange} />
        </fieldset>
        <button type="submit">Посчитать</button>
      </form>
      <div className="output">{amount}</div>
    </div>
  );
}

export default App;

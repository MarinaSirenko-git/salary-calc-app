import React, { useState } from 'react';
import './App.css';

const msPerMin = 60000;

function getTimeDifference(arrivalTime: string, departureTime: string): number {
  const getDate = (string: string) => new Date(2021, 0, 1, Number(string.split(':')[0]), Number(string.split(':')[1]))
  return (getDate(departureTime).getTime() - getDate(arrivalTime).getTime()) / msPerMin
}

function App() {

  interface ITimeData {
    arrivalValueMon: string,
    departureValueMon: string,
    arrivalValueTue: string,
    departureValueTue: string,
    arrivalValueWed: string,
    departureValueWed: string,
    arrivalValueThu: string,
    departureValueThu: string,
    arrivalValueFri: string,
    departureValueFri: string
  }

  const timeData = {
    arrivalValueMon: '00:00',
    departureValueMon: '00:00',
    arrivalValueTue: '00:00',
    departureValueTue: '00:00',
    arrivalValueWed: '00:00',
    departureValueWed: '00:00',
    arrivalValueThu: '00:00',
    departureValueThu: '00:00',
    arrivalValueFri: '00:00',
    departureValueFri: '00:00'
  }

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

    const amountOnHand = (times.reduce((prevValue, currValue) => prevValue + currValue)) * ratePerHour / 60 
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

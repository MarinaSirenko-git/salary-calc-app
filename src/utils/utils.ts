import { msPerMin } from "./consts"

export default function getTimeDifference(arrivalTime: string, departureTime: string): number {
  const getDate = (string: string) => new Date(2021, 0, 1, Number(string.split(':')[0]), Number(string.split(':')[1]))
  return (getDate(departureTime).getTime() - getDate(arrivalTime).getTime()) / msPerMin
}
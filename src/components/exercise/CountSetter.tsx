/* eslint-disable @typescript-eslint/ban-types */
interface Props {
  dataLength: number
  slicedDataLength: number
  lastCount: number
  setLastCount: Function
}

export default function CountSetter({
  dataLength,
  slicedDataLength,
  lastCount,
  setLastCount,
}: Props) {
  return (
    <h3 className="my-10">
      Viewing the last{' '}
      <strong>
        {lastCount > slicedDataLength ? slicedDataLength : lastCount}
      </strong>{' '}
      workouts from <strong>{dataLength}</strong> workouts
      <select
        value={lastCount > slicedDataLength ? slicedDataLength : lastCount}
        onChange={(e) => setLastCount(+e.target.value)}
        className="w-full bg-gray-200 rounded-md px-3 py-2 mt-2 dark:bg-gray-800 outline-none focus:ring-1 ring-gray-700"
      >
        {lastCount > slicedDataLength ? (
          <option value={slicedDataLength}>{slicedDataLength}</option>
        ) : (
          ''
        )}
        {Array(10)
          .fill(0)
          .map((e, i) => (i + 1) * 10)
          .map((e) => (
            <option key={e} disabled={e > slicedDataLength}>
              {e}
            </option>
          ))}
      </select>
    </h3>
  )
}

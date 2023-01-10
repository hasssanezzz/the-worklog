/* eslint-disable @typescript-eslint/ban-types */
export default function Checkbox({
  checked,
  setChecked,
  onClick,
}: {
  checked: boolean
  setChecked: Function
  onClick?: Function
}) {
  return (
    <span
      className={`border-2  ${checked ? "bg-black border-gray-300" : 'bg-white border-black'} rounded w-[55px] h-[25px] p-[2px] cursor-pointer trns`}
      onClick={() => setChecked(!checked)}
    >
      <span
        className={`w-1/2 h-full bg-blue-500 block rounded trns ${
          checked ? 'ml-[50%]' : ''
        }`}
      ></span>
    </span>
  )
}

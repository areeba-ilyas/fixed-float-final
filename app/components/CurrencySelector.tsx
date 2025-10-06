interface CurrencySelectorProps {
  label: string
  selected: string
  onSelect: (value: string) => void
  options: string[]
}

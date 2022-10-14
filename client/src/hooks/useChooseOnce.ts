import useLocalStorage from '@/hooks/useLocalStorage'

interface Props {
  options: string[]
  key: string
}

export default function useChooseOnce({ options, key }: Props) {
  const [chosenOption, setChosenOption] = useLocalStorage(key)

  const choose = (option: string): void => {
    if (chosenOption) return console.error('cant choose twice')
    const foundOption = options.find((opt) => opt === option)
    if (!foundOption) return console.error("option doesn't exist")
    setChosenOption(foundOption)
  }

  return {
    chosenOption,
    choose,
    hasChosen: Boolean(chosenOption),
  }
}

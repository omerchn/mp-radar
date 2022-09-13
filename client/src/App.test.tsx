import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {

  it('App Renders', () => {
    render(<App />)
    expect(screen.getByTestId('app')).toBeInTheDocument()
  })

})
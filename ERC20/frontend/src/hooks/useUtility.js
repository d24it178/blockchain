import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export function useCopyToClipboard() {
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied to clipboard!')
      return true
    } catch (err) {
      toast.error('Failed to copy')
      return false
    }
  }

  return { copy }
}

export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const execute = async () => {
    setStatus('pending')
    setData(null)
    setError(null)
    try {
      const response = await asyncFunction()
      setData(response)
      setStatus('success')
      return response
    } catch (error) {
      setError(error)
      setStatus('error')
      throw error
    }
  }

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate])

  return { execute, status, data, error }
}

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

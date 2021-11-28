import { toast } from 'react-toastify'

export const copyToClipboard = (text: string) => {
    if (window.isSecureContext) return toast.error('Clipboard is inaccessible')
    window.navigator.clipboard.writeText(text)
}

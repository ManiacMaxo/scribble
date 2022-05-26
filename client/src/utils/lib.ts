export const copyToClipboard = (text: string) => {
    if (isSecureContext) navigator.clipboard.writeText(text)
}

export const classnames = (...args: any[]) => {
    return args.filter(Boolean).join(' ')
}

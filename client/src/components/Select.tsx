import { Listbox, Transition } from '@headlessui/react'
import classnames from 'classnames'
import { get } from 'lodash'
import React, { Fragment, useCallback } from 'react'
import { HiCheck, HiSelector } from 'react-icons/hi'

interface Props<T> {
    options: Array<T>
    value: T | null
    onChange: (value: T) => void
    placeholder?: string

    className?: string
    optionText?: string | ((option: T) => string)
}

const Select = <T extends any>(props: Props<T>) => {
    const getOption = useCallback(
        (option?: Props<T>['value']) => {
            if (!option) return ''
            if (!props.optionText) return option
            if (typeof props.optionText === 'string')
                return get(option, props.optionText)
            return props.optionText(option)
        },
        [props.optionText]
    )

    return (
        <Listbox value={props.value} onChange={props.onChange}>
            <div className={classnames('relative mt-1', props.className)}>
                <Listbox.Button className='relative w-full h-12 pl-3 pr-10 text-left transition-colors border rounded-lg bg-base-100 border-primary focus:outline-none focus-visible:outline-primary focus-visible:outline-offset-2'>
                    <span className='block text-sm truncate'>
                        {getOption(props.value)}
                    </span>
                    <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                        <HiSelector
                            className='w-5 h-5 text-gray-400'
                            aria-hidden='true'
                        />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg ring-1 ring-primary bg-base-100 max-h-60 focus:outline-none sm:text-sm'>
                        {props.options.map((option, optionIdx) => (
                            <Listbox.Option
                                key={optionIdx}
                                className={({ active }) =>
                                    classnames(
                                        'cursor-pointer select-none relative py-2 pl-10 pr-4',
                                        active && 'text-primary bg-primary/10'
                                    )
                                }
                                value={option}
                            >
                                {({ selected }) => {
                                    return (
                                        <>
                                            <span
                                                className={classnames(
                                                    'block truncate',
                                                    selected
                                                        ? 'font-medium'
                                                        : 'font-normal'
                                                )}
                                            >
                                                {getOption(option)}
                                            </span>
                                            {selected && (
                                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-primary'>
                                                    <HiCheck className='w-5 h-5' />
                                                </span>
                                            )}
                                        </>
                                    )
                                }}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}

export { Select }

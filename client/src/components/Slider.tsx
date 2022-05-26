import * as RSlider from '@radix-ui/react-slider'
import React from 'react'
import classnames from 'classnames'

type Props = RSlider.SliderProps & React.RefAttributes<HTMLSpanElement>

const Slider: React.FC<Props> = (props) => {
    const { children, className, ...rest } = props

    return (
        <RSlider.Root
            {...rest}
            className={classnames(
                'absolute top-full mt-1 flex h-4 w-full touch-none select-none items-center',
                className
            )}
        >
            <RSlider.Track className='h-[2px] grow rounded-full bg-slate-600 dark:bg-slate-50'>
                <RSlider.Range className='h-full w-full rounded-full bg-inherit' />
            </RSlider.Track>
            <RSlider.Thumb className='dark:focus:shadow-base-300 focus:shadow-base-300 block aspect-square w-4 cursor-pointer rounded-full bg-slate-500 shadow transition-all hover:bg-slate-400 focus:shadow-lg dark:bg-slate-50 dark:hover:bg-slate-100' />
        </RSlider.Root>
    )
}

export { Slider }

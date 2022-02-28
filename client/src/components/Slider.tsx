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
                'absolute flex items-center w-full h-4 mt-1 select-none top-full touch-none',
                className
            )}
        >
            <RSlider.Track className='rounded-full h-[2px] dark:bg-slate-50 grow'>
                <RSlider.Range className='w-full h-full rounded-full bg-inherit' />
            </RSlider.Track>
            <RSlider.Thumb className='block w-4 transition-all rounded-full shadow aspect-square dark:bg-slate-50 focus:shadow-base-300 focus:shadow-lg hover:bg-slate-100' />
        </RSlider.Root>
    )
}

export { Slider }

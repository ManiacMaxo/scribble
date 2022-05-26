import create from 'zustand'

export const MIN_BRUSH_SIZE = 1
export const MAX_BRUSH_SIZE = 50

type DrawMode = 'draw' | 'erase' | 'fill'

export interface IDrawStore {
    colour: string
    previousColour: string | null
    size: number
    mode: DrawMode
    changeColour: (colour: string) => void
}

export const useDraw = create<IDrawStore>((set) => ({
    colour: '#000000',
    previousColour: null,
    size: 1,
    mode: 'draw',
    changeColour: (colour: string) =>
        set((state) => ({ colour, previousColour: state.colour }))
}))

import React, { useState } from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import styles from './CharacterCreator.module.scss'

interface Props {}

const CharacterCreator: React.FC<Props> = () => {
    const [eyes, setEyes] = useState<string>('0px 0px')
    const [mouth, setMouth] = useState<string>('0px 0px')
    const [skin, setSkin] = useState<string>('0px 0px')

    const allEyes: number[] = []
    const allMouths: number[] = []
    const allSkins: number[] = []

    const elements = [
        { set: setEyes, get: eyes, all: allEyes },
        {
            set: setMouth,
            get: mouth,
            all: allMouths
        },
        { set: setSkin, get: skin, all: allSkins }
    ]

    const change = (element: any, toNext: boolean) => {
        if (toNext) {
            element.set(
                element.all[
                    element.get + 1 > element.all.length ? 0 : element.get + 1
                ]
            )
        } else {
            element.set(
                element.all[
                    element.get - 1 < 0 ? element.all.length : element.get - 1
                ]
            )
        }
    }

    return (
        <div className={styles.root}>
            <div className={styles.previous}>
                {elements.map((element) => (
                    <button onClick={() => change(element, false)}>
                        <BsChevronDoubleLeft />
                    </button>
                ))}
            </div>
            <div className={styles.avatar}>
                <div
                    className={styles.eyes}
                    style={{ backgroundPosition: eyes }}
                ></div>
                <div
                    className={styles.mouth}
                    style={{ backgroundPosition: mouth }}
                ></div>
                <div
                    className={styles.skin}
                    style={{ backgroundPosition: skin }}
                ></div>
            </div>
            <div className={styles.next}>
                {elements.map((element) => (
                    <button onClick={() => change(element, true)}>
                        <BsChevronDoubleRight />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CharacterCreator

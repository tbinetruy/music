// @flow

type Note =
    | "C" | "C#"
    | "Db" | "D" | "D#"
    | "Eb" | "E"
    | "F" | "F#"
    | "Gb" | "G" | "G#"
    | "Ab" | "A" | "A#"
    | "Bb" | "B"

const N: Map<Note, number> = new Map()

N.set("C", 0)
N.set("C#", 1)
N.set("Db", 1)
N.set("D", 2)
N.set("D#", 3)
N.set("Eb", 3)
N.set("E", 4)
N.set("F", 5)
N.set("F#", 6)
N.set("Gb", 6)
N.set("G", 7)
N.set("G#", 8)
N.set("Ab", 8)
N.set("A", 9)
N.set("A#", 10)
N.set("Bb", 10)
N.set("B", 11)

const invN: Map<number, Note> = new Map()
for (let [note, number] of N) {
    invN.set(number, note)
}

type Error = string // for now
type Interval = [Note, Note]

/*
  Function that takes a Note and returns and interval or an error
*/
type createInterval = Note => Interval | Error

/*
  Takes a root note and a height and returns an interval
*/
const getInterval = (n: Note, h: number): [Note, Note] | Error => {
    const i = N.get(n)

    if (i !== undefined) {
        const j = invN.get((i + h) % 12)

        if(j !== undefined)
            return [n, j]
    }

    return "error"
}

type IntervalName =
    | 'diminishedSecond'
    | 'minorSecond'
    | 'majorSecond'
    | 'augmentedSecond'
    | 'diminishedThird'
    | 'minorThird'
    | 'majorThird'
    | 'augmentedThird'
    | 'diminishedFourth'
    | 'perfectFourth'
    | 'augmentedFourth'
    | 'diminishedFifth'
    | 'perfectFifth'
    | 'augmentedFifth'
    | 'diminishedSixth'
    | 'minorSixth'
    | 'majorSixth'
    | 'augmentedSixth'
    | 'diminishedSeventh'
    | 'minorSeventh'
    | 'majorSeventh'
    | 'augmentedSeventh'
    | 'octave'

const intervalHeights: Map<IntervalName, number> = new Map()
intervalHeights.set('diminishedSecond', 0)
intervalHeights.set('minorSecond', 1)
intervalHeights.set('majorSecond', 2)
intervalHeights.set('augmentedSecond', 3)
intervalHeights.set('diminishedThird', 2)
intervalHeights.set('minorThird', 3)
intervalHeights.set('majorThird', 4)
intervalHeights.set('augmentedThird', 5)
intervalHeights.set('diminishedFourth', 4)
intervalHeights.set('perfectFourth', 5)
intervalHeights.set('augmentedFourth', 6)
intervalHeights.set('diminishedFifth', 6)
intervalHeights.set('perfectFifth', 7)
intervalHeights.set('augmentedFifth', 8)
intervalHeights.set('diminishedSixth', 7)
intervalHeights.set('minorSixth', 8)
intervalHeights.set('majorSixth', 9)
intervalHeights.set('augmentedSixth', 10)
intervalHeights.set('diminishedSeventh', 9)
intervalHeights.set('minorSeventh', 10)
intervalHeights.set('majorSeventh', 11)
intervalHeights.set('augmentedSeventh', 12)
intervalHeights.set('octave', 12)

const intervals = ((): {[IntervalName]: createInterval} => {
    const bar = {}

    for (let [k, v] of intervalHeights) {
        bar[k] = (n: Note) => getInterval(n, v)
    }

    return bar
})()

type Triad = [Note, Note, Note]
type TriadQuality =
    | "diminished"
    | "minor"
    | "major"
    | "augmented"
    | "suspended"

type CreateTriad = (n: Note) => Triad

const triadStructure: Map<TriadQuality, [IntervalName, IntervalName]> = new Map()
triadStructure.set("diminished", ["majorThird", "diminishedFifth"])
triadStructure.set("minor", ["minorThird", "perfectFifth"])
triadStructure.set("major", ["majorThird", "perfectFifth"])
triadStructure.set("augmented", ["augmentedThird", "augmentedFifth"])
triadStructure.set("suspended", ["perfectFourth", "perfectFifth"])

const triads = ((): {[TriadQuality]: CreateTriad} => {
    let result = {}
    for (let [k, v] of triadStructure) {
        result[k] = n => [
            n,
            intervals[v[0]](n)[1],
            intervals[v[1]](n)[1],
        ]
    }

    return result
})()

export {
    intervals,
    triads,
}
